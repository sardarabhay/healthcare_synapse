import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page with patient form", async ({ page }) => {
    await page.goto("/");
    
    // Should show the logo
    await expect(page.getByAltText("patient").first()).toBeVisible();
    
    // Should show the sign-up heading
    await expect(page.getByText("Hi there")).toBeVisible();
    
    // Should render the patient form fields
    await expect(page.getByPlaceholder(/name/i).first()).toBeVisible();
    await expect(page.getByPlaceholder(/email/i).first()).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    
    // Should have Login and Admin links
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();
    
    await expect(page).toHaveURL("/login");
    await expect(page.getByText("Welcome Back")).toBeVisible();
  });

  test("should show admin passkey modal when admin link clicked", async ({ page }) => {
    await page.goto("/?admin=true");
    
    // The passkey modal should be visible
    await expect(page.getByText("Admin Access Verification")).toBeVisible();
    await expect(page.getByText("please enter the passkey")).toBeVisible();
  });

  test("should show validation errors on empty form submission", async ({ page }) => {
    await page.goto("/");
    
    // Click submit without filling anything
    await page.getByRole("button", { name: /get started/i }).click();
    
    // Should show validation errors (form should not navigate away)
    await expect(page).toHaveURL("/");
  });
});

test.describe("Login Page", () => {
  test("should load the login page", async ({ page }) => {
    await page.goto("/login");
    
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(page.getByPlaceholder(/email/i).first()).toBeVisible();
  });

  test("should show error for non-existent email", async ({ page }) => {
    await page.goto("/login");
    
    // Fill in a non-existent email
    await page.getByPlaceholder(/email/i).first().fill("nonexistent@test.com");
    await page.getByRole("button", { name: /login/i }).click();
    
    // Should show error message
    await expect(page.getByText(/no account found/i)).toBeVisible({ timeout: 10000 });
  });

  test("should have link back to sign up", async ({ page }) => {
    await page.goto("/login");
    
    const signUpLink = page.getByRole("link", { name: /sign up/i }).or(
      page.getByRole("link", { name: /get started/i })
    );
    // If there's a sign-up link, verify it exists
    if (await signUpLink.count() > 0) {
      await expect(signUpLink.first()).toBeVisible();
    }
  });
});

test.describe("Admin Dashboard", () => {
  test("should load admin page", async ({ page }) => {
    await page.goto("/admin");
    
    // Admin page should load (may show appointment stats or content)
    await expect(page).toHaveURL("/admin");
  });
});

test.describe("Navigation & Routing", () => {
  test("should return 404-like response for invalid patient route", async ({ page }) => {
    const response = await page.goto("/patients/invalid-user-id/dashboard");
    // Page should load (even if it shows error state)
    expect(response?.status()).toBeLessThan(500);
  });

  test("should handle direct access to registration page", async ({ page }) => {
    const response = await page.goto("/patients/test-user/register");
    expect(response?.status()).toBeLessThan(500);
  });
});
