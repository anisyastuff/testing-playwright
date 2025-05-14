import { test, expect } from "@playwright/test";
import { RegistPage } from "../pages/regist-page.js";

const baseURL = "https://tutorialsninja.com/demo/";
let registPage = RegistPage;

test.beforeEach("Go to base URL", async ({ page }) => {
  await page.goto(baseURL);
  registPage = new RegistPage(page);
});

test.describe("Register Test Case", () => {
  test("Register with valid email", async ({ page }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", `alisha${Date.now()}@email.com`);
    await page.fill("#input-telephone", "12345689");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty123");
    await page.check('input[type="radio"][value="1"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');
    await expect(
      page.getByText("Your Account Has Been Created!")
    ).toBeVisible();
  });

  test("Register leaving all field empty", async ({ page }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.click('input[value="Continue"]');

    await expect(
      page.getByText("Warning: You must agree to the Privacy Policy!")
    ).toBeVisible();
    await expect(
      page.getByText("First Name must be between 1 and 32 characters!")
    ).toBeVisible();
    await expect(
      page.getByText("Last Name must be between 1 and 32 characters!")
    ).toBeVisible();
    await expect(
      page.getByText("E-Mail Address does not appear to be valid!")
    ).toBeVisible();
    await expect(
      page.getByText("Telephone must be between 3 and 32 characters!")
    ).toBeVisible();
    await expect(
      page.getByText("Password must be between 4 and 20 characters!")
    ).toBeVisible();
  });

  test("Register with existing email", async ({ page }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", "lilit48427@magpit.com");
    await page.fill("#input-telephone", "12345689");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty123");
    await page.check('input[type="radio"][value="1"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');
    expect(
      page.getByText("Warning: E-Mail Address is already registered!")
    ).toBeVisible();
  });

  test("Register with invalid email", async ({ page }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", "email@");
    await page.fill("#input-telephone", "12345689");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty123");
    await page.check('input[type="radio"][value="1"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');
    await expect(page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=account/register"
    );
  });

  test("Register with unmatched passwords confirmation", async ({ page }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", `alisha${Date.now()}@email.com`);
    await page.fill("#input-telephone", "12345689");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty1234");
    await page.check('input[type="radio"][value="1"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');
    await expect(
      page.getByText("Password confirmation does not match password!")
    ).toBeVisible();
  });

  test("Register with name more than 32 characters", async function ({ page }) {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alishazabcdefghijklmnopqrstuvwxyz");
    await page.fill("#input-lastname", "Hendersonabcdefghijklmnopqrstuvwxyz");
    await page.fill("#input-email", `alisha${Date.now()}@email.com`);
    await page.fill("#input-telephone", "12345689");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty123");
    await page.check('input[type="radio"][value="0"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');

    const alertFirstName = "First Name must be between 1 and 32 characters!";
    await expect(
      page.locator("#account > div:nth-child(3)>div>div")
    ).toHaveText(alertFirstName);
    const alertLastName = "Last Name must be between 1 and 32 characters!";
    await expect(
      page.locator("#account > div:nth-child(4) > div > div")
    ).toHaveText(alertLastName);
  });

  test("Registration with number telephone less than 3 characters ", async ({
    page,
  }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();

    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", `alisha${Date.now()}@email.com`);
    await page.fill("#input-telephone", "12");
    await page.fill("#input-password", "Qwerty123");
    await page.fill("#input-confirm", "Qwerty123");
    await page.check('input[type="radio"][value="0"]');
    await page.check('input[name="agree"]');
    await page.click('input[value="Continue"]');

    const alertTelephone = "Telephone must be between 3 and 32 characters!";
    await expect(page.getByText(alertTelephone)).toBeVisible();
  });

  test("Registration with passwords more than 20 characters", async ({
    page,
  }) => {
    await registPage.clickMyAccount();
    await registPage.clickRegister();
    
    await page.fill("#input-firstname", "Alisha");
    await page.fill("#input-lastname", "Henderson");
    await page.fill("#input-email", `alisha${Date.now()}@email.com`);
    await page.fill("#input-telephone", "1234567890");
    await page.fill("#input-password", "Qwertyuiop12345678910abcd");
    await page.fill("#input-confirm", "Qwertyuiop12345678910abcd");

    await page.check('input[type="radio"][value="1"]');
    await page.check('input[name="agree"]');
    await page.click("#content > form > div > div > input.btn.btn-primary");

    const alertPass = "Password must be between 4 and 20 characters!";
    await expect(page.getByText(alertPass)).toBeVisible();
  });
});
