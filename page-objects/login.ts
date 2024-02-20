import { Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   *
   * @param username : fill username for login
   */
  async inputUsername(username: string) {
    await this.page.getByPlaceholder("Username").fill(username);
  }

  /**
   *
   * @param password : fill password for login
   */
  async inputPassword(password: string) {
    await this.page.getByPlaceholder("Password").fill(password);
  }

  async submitFormLogin() {
    try {
      await this.page.getByRole("button", { name: "Login" }).click();
    } catch (error) {
      console.error("Cant Login ❌ , please check error ", error);
    }
  }
}
