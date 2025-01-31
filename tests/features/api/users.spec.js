const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';

    test('GET request returns user list', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users`);
        expect(response.ok()).toBeTruthy();

        const users = await response.json();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('email');
    });

    test('POST request creates new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                name: 'John Doe',
                email: 'john@example.com'
            }
        });

        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        expect(user).toHaveProperty('id');
        expect(user.name).toBe('John Doe');
    });

    test('PUT request updates existing user', async ({ request }) => {
        const updatedData = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            website: 'janesmith.dev'
        };

        const response = await request.put(`${baseUrl}/users/1`, {
            data: updatedData
        });

        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        expect(user.name).toBe(updatedData.name);
        expect(user.email).toBe(updatedData.email);
        expect(user.website).toBe(updatedData.website);
    });

    test('DELETE request returns success status', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/1`);

        // JSONPlaceholder returns 200 for successful DELETE
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // For JSONPlaceholder, verify the response is empty
        const body = await response.text();
        expect(body).toBe("{}");
    });
}); 