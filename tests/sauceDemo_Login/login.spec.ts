import { expect, test } from "@playwright/test";
import { LoginPage } from "../../page-objects/login";
import { HomePage } from "../../page-objects/homepage";
import { NavbarPage } from "../../page-objects/navbar";
import { ScreenShot } from "../../page-objects/screenShot";
import "dotenv/config";

let loginPage: LoginPage;
let homePage: HomePage;
let screenShot: ScreenShot;
let navbar: NavbarPage;

test.describe("Saucedemo standard / locked user / problem user / performance", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    screenShot = new ScreenShot(page);
    await page.goto(`${process.env.baseURL_Sauce}`);
  });

  test("Verify user as standard_user", async ({ page }) => {
    await loginPage.inputUsername(`${process.env.username_standard}`);
    await loginPage.inputPassword(`${process.env.password}`);
    await screenShot.takeScreenShot("1-login as user standard");
    await loginPage.submitFormLogin();

    // verify page will redirect to homepage
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".app_logo")).toBeVisible();
    await screenShot.takeScreenShot("2-login as user standard succesfully");
  });

  test("Verify user as locked out user", async ({ page }) => {
    await loginPage.inputUsername(`${process.env.username_locked}`);
    await loginPage.inputPassword(`${process.env.password}`);
    await screenShot.takeScreenShot("3-login as user locked");
    await loginPage.submitFormLogin();

    if (page.url() === "https://www.saucedemo.com/inventory.html") {
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page.locator(".app_logo")).toBeVisible();
    } else {
      const errorMessage = page.locator('[data-test="error"]');
      await expect(page).toHaveURL("https://www.saucedemo.com/");
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
      await screenShot.takeScreenShot("4-login as user locked with errorMessage");
    }
  });

  test("Verify user as problem user", async ({ page }) => {
    await loginPage.inputUsername(`${process.env.username_problem}`);
    await loginPage.inputPassword(`${process.env.password}`);
    await screenShot.takeScreenShot("5-login as user problem user");
    await loginPage.submitFormLogin();

    const listProduct = page.locator(".inventory_item");

    let allImageProductSame = true;

    for (const image of await listProduct.all()) {
      const src = await image.locator("img").getAttribute("src");
      if (src !== "/static/media/sl-404.168b1cce.jpg") {
        allImageProductSame = false;
        break;
      }
    }

    if (allImageProductSame) {
      expect(allImageProductSame).toBeTruthy();
      console.log("link product for all image is same ❌");
      await screenShot.takeScreenShot("6-login as user problem user image same");
    } else {
      expect(allImageProductSame).toBeFalsy();
      console.log("link product for all image is different ✅");
    }
  });

  test("Verify user as performance_glitch_user", async ({ page }) => {
    // still don't understand the performance test in playwright
    await loginPage.inputUsername(`${process.env.username_perform}`);
    await loginPage.inputPassword(`${process.env.password}`);
    await loginPage.submitFormLogin();
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    await screenShot.takeScreenShot("7-login as user performance");
  });
});

test.describe("Saucedemo - visual user", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    screenShot = new ScreenShot(page);
    await page.goto(`${process.env.baseURL_Sauce}`);
    await loginPage.inputUsername(`${process.env.username_visual}`);
    await loginPage.inputPassword(`${process.env.password}`);
    await loginPage.submitFormLogin();
  });

  test("Verify user as visual user - shopping cart icon & navbar button", async ({ page }) => {
    await screenShot.takeScreenShotElement(".header_container", "8-login as visual user - shopping cart icon & navbar button");
    await expect(homePage.shopingCartContainer).toBeVisible();
    await homePage.checkVisualFailure("#shopping_cart_container");
    await homePage.checkVisualFailure(".bm-burger-button > img");
  });

  test("Verify user as visual user - close navbar", async ({ page }) => {
    navbar = new NavbarPage(page);
    await navbar.openNavbar();
    await screenShot.takeScreenShotElement(".bm-menu-wrap", "9-login as visual user - close navbar");
    await expect(navbar.closeNav).toBeVisible();
    await navbar.checkVisualFailure('[alt="Close Menu"]');
  });
});
