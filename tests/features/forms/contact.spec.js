const { test, expect } = require('@playwright/test');

test.describe('Contact Form Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc');
    });

    test('can add new todo item', async ({ page }) => {
        const newTodo = 'Buy groceries';
        await page.getByPlaceholder('What needs to be done?').fill(newTodo);
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        await expect(page.getByText(newTodo)).toBeVisible();
    });

    test('can mark todo as completed', async ({ page }) => {
        // Add a todo first
        const todoText = 'Test task';
        await page.getByPlaceholder('What needs to be done?').fill(todoText);
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Mark it as completed
        await page.getByRole('checkbox').first().check();

        // Verify it's marked as completed using a more specific selector
        await expect(page.getByTestId('todo-item')).toHaveClass(/completed/);
    });
}); 