import { Page, Locator } from "@playwright/test";
import { HomePage } from "./homepage";

export class NavbarPage extends HomePage {
  page: Page;
  closeNav: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.closeNav = page.locator('[alt="Close Menu"]');
  }

  async openNavbar() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
  }

  async closeNavbar() {
    await this.page.getByRole("button", { name: "Close Menu" }).click();
  }
}
