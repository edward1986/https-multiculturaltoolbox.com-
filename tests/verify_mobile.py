from playwright.sync_api import sync_playwright
import os

def run_mobile_verification(page):
    # Set viewport to mobile
    page.set_viewport_size({"width": 375, "height": 667})

    # Home page
    page.goto("http://localhost:1313")
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/mobile_home.png")

    # Apply page
    page.goto("http://localhost:1313/apply")
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/mobile_apply.png")

    # Test menu toggle if any (though currently it's a simple list)
    # Actually, check if the menu items wrap correctly
    page.screenshot(path="tests/screenshots/mobile_nav.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1")
        page = context.new_page()
        try:
            run_mobile_verification(page)
        finally:
            context.close()
            browser.close()
