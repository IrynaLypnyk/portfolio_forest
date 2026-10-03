import { test, expect } from '@playwright/test';

test('water renders and animates without covering controls', async ({ page }, testInfo) => {
  await page.goto('/');
  const canvas = page.locator('.water-canvas.is-ready');
  await expect(canvas).toBeVisible({ timeout: 15000 });
  await expect(canvas).toHaveCSS('pointer-events', 'none');
  const first = await canvas.screenshot();
  await page.waitForTimeout(300);
  const next = await canvas.screenshot();
  expect(first.equals(next)).toBe(false);
  await page.locator('.auth-btn').click();
  await expect(page.locator('.welcome__flipper')).toHaveCSS('transform', /matrix3d/);
  await page.locator('.form__goto-btn_auth-form').click();
  await expect(page.locator('#js-preloader')).toHaveCSS('opacity', '0');
  await page.screenshot({ path: testInfo.outputPath('water-home.png'), animations: 'disabled' });
  await page.setViewportSize({ width: 810, height: 900 });
  await expect.poll(() => canvas.evaluate(el => Math.round(el.width / el.getBoundingClientRect().width))).toBeGreaterThan(0);
  await page.goto('/my-works.html');
  await expect(page.locator('.water-canvas')).toHaveCount(0);
  await expect(page.locator('#js-preloader')).toHaveCSS('opacity', '0');
  await page.screenshot({ path: testInfo.outputPath('water-hero.png'), animations: 'disabled' });
});

test('reduced motion keeps the static background and can be changed live', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.water-canvas')).toHaveCount(0);
  await expect(page.locator('.welcome').first()).toHaveCSS('background-image', /bg.*\.jpg/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.water-canvas.is-ready')).toBeVisible({ timeout: 15000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.water-canvas')).toHaveCount(0);
});

test('failed texture leaves the page usable', async ({ page }) => {
  await page.route('**/water-maps.jpg', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#js-preloader')).toHaveClass(/done/);
  await expect(page.locator('.water-canvas')).toHaveCount(0);
  await page.locator('.auth-btn').click();
  await expect(page.locator('.welcome__flipper')).toHaveCSS('transform', /matrix3d/);
});

test('WebGL context loss restores the static background', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.water-canvas.is-ready')).toBeVisible({ timeout: 15000 });
  await page.locator('.water-canvas').evaluate(canvas => {
    canvas.getContext('webgl').getExtension('WEBGL_lose_context').loseContext();
  });
  await expect(page.locator('.water-canvas')).toHaveCount(0);
  await expect(page.locator('.welcome').first()).toHaveCSS('background-image', /bg.*\.jpg/);
});


test('browsers without WebGL keep the static background', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === 'webgl' ? null : original.call(this, type, ...args);
    };
  });
  await page.goto('/');
  await expect(page.locator('#js-preloader')).toHaveClass(/done/);
  await expect(page.locator('.water-canvas')).toHaveCount(0);
  await expect(page.locator('.welcome').first()).toHaveCSS('background-image', /bg.*\.jpg/);
});

for (const name of ['about', 'my-works', 'blog']) {
  test(`${name}: static hero menu covers the page and arrow scrolls`, async ({ page }) => {
    await page.route('https://**/*', route => route.abort());
    await page.goto(`/${name}.html`);
    await expect(page.locator('.water-canvas')).toHaveCount(0);
    await expect(page.locator('#js-preloader')).toHaveCSS('opacity', '0');
    await page.locator('.burger-menu__icon').click();
    const menu = page.locator('.burger-menu__list');
    await expect(menu).toHaveCSS('height', `${page.viewportSize().height}px`);
    expect(await menu.evaluate(el => [0.25, 0.65, 0.95].every(fraction =>
      el.contains(document.elementFromPoint(15, innerHeight * fraction))))).toBe(true);
    await page.locator('.burger-menu__icon').click();
    await expect(menu).toHaveCSS('height', '0px');
    const arrow = page.locator('.header__arrow-btn');
    if (await arrow.isVisible()) {
      const target = await page.locator('.section').nth(1).evaluate(el => el.getBoundingClientRect().top + scrollY);
      await arrow.click();
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThanOrEqual(Math.floor(target) - 2);
    }
  });
}
