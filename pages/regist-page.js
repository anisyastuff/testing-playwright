import { expect, page } from "@playwright/test";

export class RegistPage {
  constructor(page) {
    this.page = page;
    this.registLink = page.getByRole("link", { name: "Register" });
    this.myAccountDropdown = page.click('a[title="My Account"]');
  }
  async clickMyAccount() {
    await this.myAccountDropdown;
  }
  async clickRegister() {
    await this.registLink.click();
  }
}
export default RegistPage;
