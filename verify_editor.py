import asyncio
import os
from playwright.async_api import async_playwright
import subprocess
import time
import signal

async def run_verification():
    # Start the dev server
    print("Starting dev server...")
    process = subprocess.Popen(
        ["npm", "run", "dev", "--", "--port", "5188"],
        cwd="react-editor",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setsid
    )

    # Give it time to start
    time.sleep(10)

    # Define screenshot directory
    screenshot_dir = "verification/screenshots"
    if not os.path.exists(screenshot_dir):
        os.makedirs(screenshot_dir)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        try:
            # 1. Initial State
            print("Capturing initial state...")
            await page.goto("http://localhost:5188", wait_until="networkidle")
            await page.wait_for_timeout(2000)
            await page.screenshot(path=f"{screenshot_dir}/01_main_editor.png")

            # 2. Select Root Node
            print("Selecting root node...")
            await page.click("text=Modern Science Textbook")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=f"{screenshot_dir}/02_root_selected.png")

            # 3. Open Library
            print("Opening Library...")
            await page.click("text=Add from library")
            await page.wait_for_selector("text=Add from Library", timeout=5000)
            await page.screenshot(path=f"{screenshot_dir}/04_library_open.png")
            await page.keyboard.press("Escape")
            await page.wait_for_timeout(500)

            # 4. Open Collaborators
            print("Opening Collaborators...")
            await page.locator("header svg").first.click()
            await page.wait_for_selector("text=Manage Collaborators", timeout=5000)
            await page.screenshot(path=f"{screenshot_dir}/05_collaborators_open.png")
            await page.keyboard.press("Escape")
            await page.wait_for_timeout(500)

            # 5. Open Bulk Upload
            print("Opening Bulk Upload...")
            await page.locator(".w-64 .cursor-pointer svg").click()
            await page.wait_for_selector("text=Bulk Upload", timeout=5000)
            await page.screenshot(path=f"{screenshot_dir}/06_bulk_upload_open.png")
            await page.keyboard.press("Escape")

        except Exception as e:
            print(f"Error during verification: {e}")
            await page.screenshot(path=f"{screenshot_dir}/error.png")
        finally:
            await browser.close()
            # Terminate the dev server
            os.killpg(os.getpgid(process.pid), signal.SIGTERM)

if __name__ == "__main__":
    asyncio.run(run_verification())
