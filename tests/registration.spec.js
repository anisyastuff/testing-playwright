// @ts-check
import { test, expect } from "@playwright/test";

// test("Has a title", async ({ page }) => {
//   await page.goto("https://tutorialsninja.com/demo/");
//   await expect(page).toHaveTitle("Your Store");
// });

// or can log the title

// test("Log title", async ({ page }) => {
//   await page.goto("https://tutorialsninja.com/demo/");

//   const title = await page.title();
//   // console.log('Page title:',title);
//   await expect(page).toHaveTitle(title);
// });

test("Register with valid email", async ({ page }) => {
  await page.goto("https://tutorialsninja.com/demo/");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();
  await page.fill("#input-firstname", "Alisha");
  // await page.pause();
  await page.fill("#input-lastname", "Henderson");
  await page.fill("#input-email", `alisha${Date.now()}@email.com`);
  await page.fill("#input-telephone", "12345689");
  await page.fill("#input-password", "Qwerty123");
  await page.fill("#input-confirm", "Qwerty123");
  await page.check('input[type="radio"][value="1"]'); // If choose "YES"
  // await page.check('input[type="radio"][value="1"]'); // If choose "NO"
  await page.check('input[name="agree"]');
  // await page.getByRole("button", { value: "Continue" }).click();
  await page.click('input[value="Continue"]');
  await expect(page.getByText("Your Account Has Been Created!")).toBeVisible();
});

test("Register with existing email", async ({ page }) => {
  await page.goto("https://tutorialsninja.com/demo/");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();
  await page.fill("#input-firstname", "Alisha");
  await page.fill("#input-lastname", "Henderson");
  await page.fill("#input-email", "lilit48427@magpit.com");
  await page.fill("#input-telephone", "12345689");
  await page.fill("#input-password", "Qwerty123");
  await page.fill("#input-confirm", "Qwerty123");
  await page.check('input[type="radio"][value="1"]'); // If choose "YES"
  // await page.check('input[type="radio"][value="1"]'); // If choose "NO"
  await page.check('input[name="agree"]');
  await page.click('input[value="Continue"]');
  expect(page.getByText("Warning: E-Mail Address is already registered!")).toBeVisible();
//  or
//   const alertError = "Warning: E-Mail Address is already registered!";
//   await expect(page.getByText(alertError)).toBeVisible();
});

test("Register leaving all field empty", async ({ page }) => {
  await page.goto("https://tutorialsninja.com/demo/");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();

  await page.click('input[value="Continue"]');

  await expect(
    page.getByText("Warning: You must agree to the Privacy Policy!")
  ).toBeVisible();
  //   Using locator
  //   await expect(page.locator("#account-register > div.alert.alert-danger.alert-dismissible")).toHaveText("Warning: You must agree to the Privacy Policy!");
  //   or
  //   const alertPrivacy = "Warning: You must agree to the Privacy Policy!";
  //   await expect(page.locator("#account-register > div.alert.alert-danger.alert-dismissible")).toHaveText(alertPrivacy);

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

test("Register with invalid email", async ({ page }) => {
  await page.goto("https://tutorialsninja.com/demo/");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();
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
  await page.goto("https://tutorialsninja.com/demo");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();

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
  await page.goto("https://tutorialsninja.com/demo");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();

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
  await expect(page.locator("#account > div:nth-child(3)>div>div")).toHaveText(
    alertFirstName
  );
  const alertLastName = "Last Name must be between 1 and 32 characters!";
  await expect(
    page.locator("#account > div:nth-child(4) > div > div")
  ).toHaveText(alertLastName);
});

test("Registration with number telephone less than 3 characters ", async ({
  page,
}) => {
  await page.goto("https://tutorialsninja.com/demo");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();
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
  await page.goto("http://tutorialsninja.com/demo/");
  await page.click('a[title="My Account"]');
  await page.getByRole("link", { name: "Register" }).click();
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
