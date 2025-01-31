const { test, expect } = require('@playwright/test');

test.describe('Playwright Documentation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://playwright.dev/');
    });

    test('has correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('navigates to installation page', async ({ page }) => {
        const getStartedLink = page.getByRole('link', { name: 'Get started' });
        await expect(getStartedLink).toBeVisible();
        await getStartedLink.click();

        const installationHeading = page.getByRole('heading', { name: 'Installation' });
        await expect(installationHeading).toBeVisible();
    });
}); 