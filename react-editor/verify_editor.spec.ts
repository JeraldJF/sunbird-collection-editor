import { test, expect } from '@playwright/test';

test('verify collection editor layout and form', async ({ page }) => {
  // Go to the local dev server
  await page.goto('http://localhost:5173');

  // Wait for the app to load
  await expect(page.locator('header')).toBeVisible();

  // Check header color
  const header = page.locator('header').first();
  const bgColor = await header.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Header Background Color:', bgColor);
  // #00529b is rgb(0, 82, 155)
  expect(bgColor).toBe('rgb(0, 82, 155)');

  // Capture initial view
  await page.screenshot({ path: '/home/jules/verification/initial_view_v2.png', fullPage: true });

  // Click on a node in the sidebar tree to show the form
  // The tree uses react-arborist, let's try to find a node by text
  const node = page.getByText('Modern Science Textbook').first();
  await node.click();

  // Wait for MetaForm to display
  await expect(page.getByText('Add an image')).toBeVisible();

  // Capture form view
  await page.screenshot({ path: '/home/jules/verification/form_view_v2.png', fullPage: true });

  // Verify form fields
  await expect(page.getByLabel('Title *')).toBeVisible();
  await expect(page.getByLabel('Description')).toBeVisible();
  await expect(page.getByLabel('Keywords')).toBeVisible();
  await expect(page.getByText('Add from library')).toBeVisible();

  console.log('Verification successful');
});
