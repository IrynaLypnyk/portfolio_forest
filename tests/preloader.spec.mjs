import { test, expect } from '@playwright/test';

for (const resource of ['**/water-maps.jpg', '**/decor/bg*.jpg']) {
  test(`preloader waits for ${resource}`, async ({ page }) => {
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    await page.route(resource, async route => {
      await pending;
      await route.continue();
    });
    try {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect.poll(() => page.evaluate(() =>
        Array.from(document.images).every(image => image.complete))).toBe(true);
      await expect(page.locator('#js-load-percent')).toHaveText(/%/);
      // Outlast the minimum display time while the resource is still blocked.
      await page.waitForTimeout(800);
      await expect(page.locator('#js-preloader')).not.toHaveClass(/done/);
      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    } finally {
      release();
    }
    await expect(page.locator('#js-preloader')).toHaveClass(/done/);
    await expect(page.locator('#js-load-percent')).toHaveText('100%');
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });
}

test('preloader releases the page if a background never finishes', async ({ page }) => {
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  await page.route('**/water-maps.jpg', async route => {
    await pending;
    await route.abort();
  });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await expect(page.locator('#js-preloader')).toHaveClass(/done/, { timeout: 7000 });
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  } finally {
    release();
  }
});
