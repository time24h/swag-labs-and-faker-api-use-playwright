import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  shopingCartContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopingCartContainer = page.locator("#shopping_cart_container a");
  }

  /**
   *
   * @param findElement : find element has class visual_failure
   */
  async checkVisualFailure(findElement: string) {
    const element = this.page.locator(findElement);
    await element.waitFor();
    const hasVisualFailure = await element.evaluate((cartIcon) => {
      return cartIcon.classList.contains("visual_failure");
    });
    expect.soft(hasVisualFailure).toBeFalsy();
  }
}
