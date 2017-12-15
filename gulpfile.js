/* eslint-disable indent */
const gulp = require('gulp');
const pug = require('gulp-pug');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const del = require('del');
const browserSync = require('browser-sync').create();

//styles
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


//sprites
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');

//webpack
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
	root: './build',
	templates: {
		pages: 'src/templates/pages/*.pug',
		src: 'src/templates/**/*.pug',
		dest: 'build/assets/',
	},

	styles: {
		src: 'src/styles/**/*.scss',
		dest: 'build/assets/styles/',
	},
	images: {
		src: 'src/images/**/*.{jpg,png}',
		dest: 'build/assets/images/',
	},
	sprite:{
		src: 'src/images/icons/**/*.svg',
		dest: 'build/assets/images/',
    },
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'build/assets/scripts/',
	},
	fonts: {
		src: 'src/fonts/**/*.*',
		dest: 'build/assets/fonts/',
	},
};

// pug
function templates() {
	return gulp.src(paths.templates.pages)
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest(paths.root));
}

// scss
function styles() {
	return gulp.src('./src/styles/app.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(gulpStylelint({reporters: [{formatter: 'string', console: true}]}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest));
}


// webpack
function scripts() {
	return gulp.src('src/scripts/app.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(gulpWebpack(webpackConfig, webpack))
		.pipe(gulp.dest(paths.scripts.dest));
}

// очистка
function clean() {
	return del(paths.root);
}

// галповский вотчер
function watch() {
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.templates.src, templates);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.fonts.src, fonts);
	gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
	browserSync.init({
		server: paths.root,
	});
	browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
}

// просто переносим шрифты
function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}

//svg sprite
function toSprite() {
	return gulp
		.src(paths.sprite.src)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			})
		)
		.pipe(
			cheerio({
				run: function($) {
					$('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
				},
				parserOptions: {
					xmlMode: true,
				},
			})
		)
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
				mode: {
					symbol: {
						sprite: '../icons/sprite.svg',
						example: {
							dest: '../tmp/spriteSvgDemo.html', // демо html
						},
					},
				},
			}))
			.pipe(gulp.dest(paths.sprite.dest));
  }

// экспортируем функции для доступа из терминала (gulp clean)
exports.templates = templates;
exports.scripts = scripts;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.toSprite = toSprite;


// контрольная сборка на продакшн
gulp.task('default', gulp.series(
	clean,
	gulp.parallel(styles, templates, images, fonts, scripts, toSprite),
	gulp.parallel(watch, server)
));

// // просто работаем
// gulp.task('default', gulp.series(
//     gulp.parallel(styles, templates, images, fonts, scripts, toSprite),
//     gulp.parallel(watch, server)
// ));
//
// // контрольная сборка на продакшен
// gulp.task('build', gulp.series(
//     clean,
//     gulp.parallel(styles, templates, images, fonts, scripts, toSprite)
// ));