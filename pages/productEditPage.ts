import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { applocators } from "../tests/locators/subscription.locator";
import { ENV } from "../utils/env";

export class ProductEditPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Update product name
  async updateProductName(newProductName: string): Promise<void> {
    await this.click(applocators.product.nameInput);
    await this.fill(applocators.product.nameInput, newProductName);
    await this.click(applocators.product.saveButton);
  }

  // Verify product name is updated
  async isProductNameUpdated(expectedName: string): Promise<boolean> {
    try {
      await expect(this.locator(applocators.product.nameInput)).toHaveValue(expectedName);
      await expect(this.page.getByText("Product saved successfully!")).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  // Upload product images
  async uploadProductImages(imagePath: string = ENV.fileUploadPath): Promise<void> {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.page.locator("#images div").nth(2).click(),
    ]);
    await fileChooser.setFiles(imagePath);
    
    // Wait for upload to complete
    const uploaded = this.page.locator("#images div").nth(2).first();
    await expect(uploaded).toBeVisible();
  }

  // Verify image update was successful
  async isImageUpdatedSuccessfully(): Promise<boolean> {
    try {
      await this.click(applocators.product.saveButton);
      await expect(this.page.getByText("Product saved successfully!")).toBeVisible();
      await expect(this.page.locator("#images div").first()).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  // Get product ID from URL
  async getProductId(): Promise<number> {
    const url = this.page.url();
    const match = url.match(/\/edit\/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}