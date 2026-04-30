from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Navigate to home
    page.goto("http://localhost:1313")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/home.png")

    # CUJ: Test Track Application Errors
    page.get_by_label("Main navigation").get_by_role("link", name="Track Application", exact=True).click()
    page.wait_for_timeout(500)
    # Empty track
    page.get_by_role("button", name="Track Status").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/track_error_empty.png")

    # Invalid ARN
    page.locator("#arn-input").fill("INVALID-ARN")
    page.get_by_role("button", name="Track Status").click()
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/track_error_notfound.png")

    # Valid ARN
    page.locator("#arn-input").fill("ARN-2024-051288")
    page.get_by_role("button", name="Track Status").click()
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/track_result.png")

    # CUJ: Test Apply Errors
    page.get_by_label("Main navigation").get_by_role("link", name="Apply", exact=True).click()
    page.wait_for_timeout(500)
    # Step 1 error
    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/apply_error_step1.png")

    # Complete flow
    page.locator("#service-select").select_option(label="Radio Operator Certificate")
    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)

    page.locator("#region-select").select_option(label="NCR - National Capital Region")
    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)

    # Step 4 error
    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/apply_error_step4.png")

    page.locator("#fname").fill("Juan")
    page.locator("#lname").fill("Dela Cruz")
    page.locator("#email").fill("juan@example.com")
    page.locator("#contact").fill("09171234567")
    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Next Step →").click()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Confirm Details →").click()
    page.wait_for_timeout(500)

    # Step 7 error (terms)
    page.get_by_role("button", name="Submit Application").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/apply_error_terms.png")

    page.get_by_label("I agree to the Terms and Conditions and Data Privacy Policy.").check()
    page.get_by_role("button", name="Submit Application").click()
    page.wait_for_timeout(1000)
    page.get_by_role("button", name="Close & View Summary").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/apply_final.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
