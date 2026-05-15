from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Navigate to home
    page.goto("http://localhost:1313")
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/home.png")

    # CUJ 1: Navigate to Services and click a service
    page.get_by_label("Main navigation").get_by_role("link", name="Services", exact=True).click()
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/services.png")

    page.get_by_text("Radio Operator Certificate").first.click()
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/service_detail.png")

    # CUJ 2: Complete an application flow
    page.get_by_label("Main navigation").get_by_role("link", name="Apply", exact=True).click()
    page.wait_for_timeout(1000)

    # Step 1: Select Service
    page.locator("#service-select").select_option(label="Radio Operator Certificate")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Go to next step: Select Region").click()
    page.wait_for_timeout(500)

    # Step 2: Select Region
    page.locator("#region-select").select_option(label="NCR - National Capital Region")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Go to next step: Choose Processing Mode").click()
    page.wait_for_timeout(500)

    # Step 3: Mode
    page.get_by_role("button", name="Go to next step: Complete Application Form").click()
    page.wait_for_timeout(500)

    # Step 4: Form
    page.locator("#fname").fill("Juan")
    page.locator("#lname").fill("Dela Cruz")
    page.locator("#email").fill("juan@example.com")
    page.locator("#contact").fill("09171234567")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Go to next step: Upload Requirements").click()
    page.wait_for_timeout(500)

    # Step 5: Upload
    page.get_by_role("button", name="Go to next step: Review Application").click()
    page.wait_for_timeout(500)

    # Step 6: Review
    page.get_by_role("button", name="Confirm Details and go to Final Submission").click()
    page.wait_for_timeout(500)

    # Step 7: Submit
    page.get_by_label("I agree to the Terms and Conditions and Data Privacy Policy.").check()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Submit Application").click()
    page.wait_for_timeout(1000)

    # Success Modal should be visible
    page.screenshot(path="tests/screenshots/apply_success_modal.png")
    page.get_by_role("button", name="Close & View Summary").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="tests/screenshots/apply_final.png")

    # CUJ 3: Track Application
    page.get_by_role("link", name="Track Status").click()
    page.wait_for_timeout(1000)
    page.locator("#arn-input").fill("ARN-2024-051288")
    page.get_by_role("button", name="Search for application status").click()
    page.wait_for_timeout(1500)
    page.screenshot(path="tests/screenshots/track_result.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="tests/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
