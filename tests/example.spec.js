// @ts-check
const {test, expect} = require('@playwright/test');

test('has title', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', {name: 'Get started'}).click();
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
});

test('Google search for "selenium is fun" has relevant results', async ({page}) => {
    await page.goto('https://www.google.com');
    await page.fill('//textarea[@name="q"]', 'selenium is fun');
    await page.press('//textarea[@name="q"]', 'Enter');
    await expect(page).toHaveTitle(/selenium is fun/i);
});
