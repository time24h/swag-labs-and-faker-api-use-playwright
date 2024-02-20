import { Page, Locator, expect } from "@playwright/test";

export class ScreenShot {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   *
   * @param fileName : give file name for screenshot
   */
  async takeScreenShot(fileName: string) {
    await this.page.waitForTimeout(500);
    await this.page.screenshot({ path: `ScreenShot/${fileName}.png` });
  }

  /**
   *
   * @param findElement : match with element for takeScreenshot
   * @param fileName : give file name for screenshot
   */
  async takeScreenShotElement(findElement: string, fileName: string) {
    const element = this.page.locator(findElement);
    await this.page.waitForTimeout(500);
    await element.screenshot({ path: `ScreenShot/${fileName}.png` });
  }
}
