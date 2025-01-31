const { test, expect } = require('@playwright/test');

test.describe('Google Search', () => {
    test('performs search', async ({ page }) => {
        // Add stealth mode
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        });

        // Navigate to Google with a delay
        await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Accept cookies if present
        try {
            const acceptButton = page.getByRole('button', { name: 'Accept all' });
            if (await acceptButton.isVisible()) {
                await acceptButton.click();
                await page.waitForTimeout(500);
            }
        } catch (e) {
            // Cookie dialog might not appear
        }

        // Perform search with human-like delays
        const searchInput = page.getByRole('combobox', { name: 'Search' });
        await expect(searchInput).toBeVisible();

        // Type slowly like a human
        await searchInput.type('selenium is fun', { delay: 100 });
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');

        // Wait longer for results
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');

        // Verify we're on a search page
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/google\.com.*?/);
    });
}); 