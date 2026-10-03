import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build as bundle } from 'esbuild';
import pug from 'pug';
import * as sass from 'sass';

// Explicit shell variables take precedence over the local development file.
if (existsSync('.env.local')) loadEnvFile('.env.local');

export async function build(output = 'build') {
  if (!['build', 'docs'].includes(output)) throw new Error('Invalid output directory');
  await rm(output, { recursive: true, force: true });
  await mkdir(`${output}/assets/styles`, { recursive: true });
  await Promise.all(['images', 'fonts', 'php'].map(name =>
    cp(`src/${name}`, `${output}/assets/${name}`, { recursive: true })));
  await cp('src/favicons', `${output}/favicons`, { recursive: true });
  const css = sass.compile('src/styles/app.scss', { style: 'compressed' });
  await writeFile(`${output}/assets/styles/app.min.css`, css.css);
  const pages = (await readdir('src/templates/pages')).filter(name => name.endsWith('.pug'));
  for (const page of pages) {
    const html = pug.renderFile(`src/templates/pages/${page}`, {
      pretty: true, googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    });
    await writeFile(`${output}/${page.replace(/\.pug$/, '.html')}`, html.replace(/[ \t]+$/gm, ''));
  }
  await bundle({
    entryPoints: ['src/scripts/app.js'], outfile: `${output}/assets/scripts/bundle.js`,
    loader: { '.vert': 'text', '.frag': 'text' },
    bundle: true, minify: true, target: ['es2020'], legalComments: 'eof',
  });
  await writeFile(`${output}/.nojekyll`, '');
  console.log(`Built ${pages.length} pages into ${output}/`);
}
if (import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await build(process.argv.includes('--pages') ? 'docs' : 'build');
}
