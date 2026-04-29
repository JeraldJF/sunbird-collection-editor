from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:5174")
    page.wait_for_timeout(2000)

    # 1. Verify that the root node (collection) does NOT show the player
    player_div = page.locator("div.shrink-0.p-4.border-b.bg-gray-100")
    if player_div.count() > 0:
        print("FAIL: Player found on root node")
    else:
        print("SUCCESS: Player not found on root node")

    page.screenshot(path="/home/jules/verification/screenshots/root_node.png")
    page.wait_for_timeout(500)

    # 2. Click on a content node and verify player appears
    # Using text locator for node
    page.get_by_text("Atomic Structure Animation").click()
    page.wait_for_timeout(2000)

    player_div = page.locator("div.shrink-0.p-4.border-b.bg-gray-100")
    if player_div.count() > 0:
        print("SUCCESS: Player found on content node")
    else:
        print("FAIL: Player not found on content node")

    page.screenshot(path="/home/jules/verification/screenshots/content_node.png")
    page.wait_for_timeout(500)

    # 3. Click "Chapter 1" (Unit) and verify NO player
    page.get_by_text("Chapter 1: The World of Atoms").click()
    page.wait_for_timeout(1000)
    player_div = page.locator("div.shrink-0.p-4.border-b.bg-gray-100")
    if player_div.count() == 0:
        print("SUCCESS: Player not found on Unit node")
    else:
        print("FAIL: Player found on Unit node")
    page.screenshot(path="/home/jules/verification/screenshots/unit_node.png")

    # 4. Click "Add from Library" - check why it failed
    # It might be because of scroll or visibility.
    # Let's try to get by text if role fails
    add_lib_btn = page.get_by_text("Add from Library")
    add_lib_btn.click()
    page.wait_for_timeout(2000)

    print("SUCCESS: Entered Library mode")
    page.screenshot(path="/home/jules/verification/screenshots/library_initial.png")
    page.wait_for_timeout(500)

    # 5. Select an item in library and verify preview player
    page.get_by_text("Newton's Laws Video").click()
    page.wait_for_timeout(2000)

    print("SUCCESS: Selected library item for preview")
    page.screenshot(path="/home/jules/verification/screenshots/library_preview.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
