import { expect, test } from "@playwright/test";

test("validates load IDs and creates a claim packet", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Check claim" }).click();
  await expect(page.locator("p.error[role=alert]")).toContainText("Use a load ID");
  await page.getByLabel("Open a demo load").fill("LD-1048");
  await page.getByRole("button", { name: "Check claim" }).click();
  await expect(page.getByRole("status")).toContainText("Loaded LD-1048");
  await page.getByRole("button", { name: "Create claim packet" }).click();
  await expect(page.getByText("Demo claim packet created")).toBeVisible();
  const followup = page.getByRole("button", { name: /First follow-up/ });
  await followup.click();
  await expect(followup).toHaveAttribute("aria-pressed", "true");
});

test("blocks a load with missing evidence", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /LD-1051/ }).click();
  await expect(page.getByRole("heading", { name: "Claim blocked" })).toBeVisible();
  await expect(page.getByText(/Missing: Rate confirmation/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Create claim packet" })).toBeDisabled();
});

test("mobile has no horizontal document overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await page.getByRole("button", { name: /LD-1057/ }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBeFalsy();
  await page.screenshot({ path: "evidence/mobile.png", fullPage: true });
});

test("captures desktop evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.goto("/");
  await page.getByRole("button", { name: /LD-1048/ }).click();
  await page.screenshot({ path: "evidence/desktop.png", fullPage: true });
});
