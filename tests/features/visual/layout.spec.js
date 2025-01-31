const { test, expect } = require('@playwright/test');

test.describe('Visual Tests', () => {
    test('homepage layout matches snapshot', async ({ page }) => {
        await page.goto('https://playwright.dev');

        // Take screenshot of the entire page
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true
        });
    });

    test('responsive layout check', async ({ page }) => {
        await page.goto('https://playwright.dev');

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page).toHaveScreenshot('mobile-view.png');

        // Test desktop view
        await page.setViewportSize({ width: 1280, height: 800 });
        await expect(page).toHaveScreenshot('desktop-view.png');
    });
}); 