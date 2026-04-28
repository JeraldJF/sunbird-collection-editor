import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/home/jules/verification/final_look.png', fullPage: true });
});
