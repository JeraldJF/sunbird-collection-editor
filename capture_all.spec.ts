import { test } from '@playwright/test';

test('capture all editor screens', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('text=Modern Science Textbook');

  // 1. Main Editor UI
  await page.screenshot({ path: 'screenshots/01_main_editor.png', fullPage: true });

  // 2. Add from Library Modal
  await page.click('text=Add from Library');
  await page.waitForSelector('text=Add from Library', { state: 'visible' });
  await page.screenshot({ path: 'screenshots/02_add_from_library.png' });
  await page.keyboard.press('Escape');

  // 3. Bulk Actions Modal
  await page.click('text=Bulk Actions');
  await page.waitForSelector('text=Bulk Hierarchy Upload', { state: 'visible' });
  await page.screenshot({ path: 'screenshots/03_bulk_actions.png' });
  await page.keyboard.press('Escape');

  // 4. Collaborators Modal
  await page.click('button:has(svg):near(button:has-text("Bulk Actions"))'); // The icon button for collaborators
  await page.waitForSelector('text=Manage Collaborators', { state: 'visible' });
  await page.screenshot({ path: 'screenshots/04_collaborators.png' });
  await page.keyboard.press('Escape');

  // 5. Preview Mode
  await page.click('text=Preview');
  await page.waitForSelector('text=Content Preview', { state: 'visible' });
  await page.screenshot({ path: 'screenshots/05_preview_mode.png' });
  await page.click('text=Back to Editor');

  // 6. Asset Browser (Icon Click)
  // Need to find the icon edit button in the form
  await page.click('text=Chapter 1: The World of Atoms'); // Select a node to show form
  // Assuming the icon is in the form, let's look for the image placeholder
  const iconEdit = page.locator('div:has-text("App Icon") + div div.bg-gray-100');
  if (await iconEdit.isVisible()) {
      await iconEdit.click();
      await page.waitForSelector('text=Select Asset', { state: 'visible' });
      await page.screenshot({ path: 'screenshots/06_asset_browser.png' });
  }
});
