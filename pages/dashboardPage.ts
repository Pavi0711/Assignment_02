import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { applocators } from "../tests/locators/subscription.locator";
import { ProductPage } from "./productPage";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Navigate to product page from dashboard
  async navigateToProductPage(): Promise<ProductPage> {
    await this.click(applocators.dashboard);
    await this.click(applocators.product.productsLink);
    await this.verifyUrl("http://localhost:3000/admin/products");
    return new ProductPage(this.page);
  }
}