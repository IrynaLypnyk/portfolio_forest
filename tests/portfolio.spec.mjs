import { test, expect } from '@playwright/test';

for (const name of ['index', 'about', 'my-works', 'blog', 'admin_1', 'admin_2', 'admin_3']) {
  test(`${name}: resources and layout`, async ({ page }, testInfo) => {
    const errors = [];
    const missing = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith('http://127.0.0.1:3000') && response.status() >= 400) missing.push(response.url());
    });
    // Third-party embeds are independent of the local portfolio build.
    await page.route(/https:\/\/(?!127\.0\.0\.1)/, route => route.abort());
    await page.goto(`/${name}.html`);
    if (!name.startsWith('admin')) {
      await expect(page.locator('#js-preloader')).toHaveClass(/done/);
      await expect(page.locator('#js-preloader')).toHaveCSS('opacity', '0');
    }
    await page.evaluate(() => document.fonts.ready);
    expect(errors).toEqual([]);
    expect(missing).toEqual([]);
    expect(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true, animations: 'disabled' });
  });
}

test('welcome flip and demo login', async ({ page }) => {
  await page.goto('/');
  await page.locator('.auth-btn').click();
  await expect(page.locator('.welcome__flipper')).toHaveCSS('transform', /matrix3d/);
  await page.locator('#auth-form input[type=text]').fill('demo');
  await page.locator('#auth-form input[type=password]').fill('demo');
  const dialog = page.waitForEvent('dialog').then(async message => {
    const text = message.message();
    await message.accept();
    return text;
  });
  await page.locator('#auth-form [type=submit]').click();
  const message = await dialog;
  expect(message).toContain('demo form');
  await expect(page).toHaveURL(/\/$/);
  await page.locator('.form__goto-btn_auth-form').click();
  await expect(page.locator('.auth-btn')).toBeVisible();
});

test('menu and project slider', async ({ page }) => {
  await page.goto('/my-works.html');
  await page.locator('.burger-menu__icon').click();
  await expect(page.locator('.burger-menu__list')).toHaveClass(/active/);
  await page.locator('.burger-menu__icon').click();
  const projects = [
    ['https://github.com/IrynaLypnyk/workadium', 'workadium.png'],
    ['https://github.com/IrynaLypnyk/mister_burger', 'mister-burger.png'],
    ['https://irynalypnyk.com/', 'iryna-portfolio.png'],
  ];
  await expect(page.locator('.slide-desc__item')).toHaveCount(3);
  for (const [url, image] of projects) {
    await expect(page.locator('.slide-desc__item.active a')).toHaveAttribute('href', url);
    await expect(page.locator('.slides-preview__item.active img')).toHaveAttribute('src', `assets/images/content/${image}`);
    await page.locator('.slides-nav__controls_next').click();
  }
  await expect(page.locator('.slide-desc__item.active a')).toHaveAttribute('href', projects[0][0]);
  await page.locator('.slides-nav__controls_prev').click();
  await expect(page.locator('.slide-desc__item.active a')).toHaveAttribute('href', projects[2][0]);
});

test('contact form handles static hosting and re-enables submit', async ({ page }) => {
  await page.goto('/my-works.html');
  await page.locator('[name=name]').fill('Test');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=message]').fill('Local test — no email is sent.');
  const dialog = page.waitForEvent('dialog').then(async message => {
    const text = message.message();
    await message.accept();
    return text;
  });
  await page.locator('#contact-form [type=submit]').click();
  const message = await dialog;
  expect(message).toContain('PHP');
  await expect(page.locator('#contact-form [type=submit]')).toBeEnabled();
  await expect(page.locator('[name=message]')).not.toBeEmpty();
});

test('preloader recovers from missing image', async ({ page }) => {
  await page.route('**/iryna-lypnyk.jpg', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#js-preloader')).toHaveClass(/done/);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});
