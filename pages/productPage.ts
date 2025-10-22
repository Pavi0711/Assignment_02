import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { applocators } from "../tests/locators/subscription.locator";
import { ENV } from "../utils/env";
import { ProductEditPage } from "./productEditPage";
import { testData } from "../utils/testData";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Navigate to new product page
  async navigateToNewProduct(): Promise<void> {
    await this.click(applocators.product.newProductLink);
  }

  // Fill basic product information
  async fillBasicProductInfo(
    productName: string,
    sku: string,
    price: string = "999"
  ): Promise<void> {
    await this.fill(applocators.product.nameInput, productName);
    await this.fill(applocators.product.skuInput, sku);
    await this.fill(applocators.product.priceInput, price);
    await this.fill(applocators.product.weightInput, "0.30");
  }

  // Select product category
  async selectCategory(category: string = "Men"): Promise<void> {
    await this.click(applocators.product.categoryLink);
    await this.fill(applocators.product.searchCategory, category);
    await applocators.product.menSelectButton(this.page).click();
  }

  // Upload product image
  async uploadFile(): Promise<void> {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.page.click("#images div"),
    ]);
    await fileChooser.setFiles(ENV.fileUploadPath);
    const uploaded = this.page.locator("#images div").first();
    await expect(uploaded).toBeVisible();
  }

  // Fill SEO information
  async fillSeoInfo(urlKeyInput: string): Promise<void> {
    await this.page.fill(applocators.product.urlKeyInput, urlKeyInput);
    await this.page.locator(applocators.product.metaTitleInput).fill("Apple iPhone 16 Pro");
    await this.page.locator(applocators.product.metaKeywordsInput).fill("iPhone, Apple, Smartphone");
    await this.fill(applocators.product.metaDescriptionInput, "Latest Apple iPhone 16 Pro with advanced features.");
  }

  // Set product status toggles
  async setProductStatus(): Promise<void> {
    await expect(this.page.getByLabel("Enabled")).toBeChecked();
  }

  // Select product attributes
  async selectAttributes(): Promise<void> {
    await this.page.locator('select[name="attributes[0][value]"]').selectOption("White");
    await this.page.locator('select[name="attributes[1][value]"]').selectOption("XXL");
  }

  // Set inventory quantity
  async setInventory(quantity: string = "50"): Promise<void> {
    await this.fill(applocators.product.quantityInput, quantity);
  }

  // Save the product
  async saveProduct(): Promise<void> {
    await this.click(applocators.product.saveButton);
  }

  // Verify product was saved successfully
  async verifyProductSaved(productName: string): Promise<void> {
    // Check for success message
    await expect(this.page.getByText("Product saved successfully!")).toBeVisible();

    // Navigate to products page
    await this.click(applocators.product.productsLink);
    await this.verifyUrl("http://localhost:3000/admin/products");

    // Verify product appears in list
    await expect(this.page.getByRole("link", { name: productName, exact: true })).toBeVisible();
  }

  // Complete product creation flow - THIS IS THE MISSING METHOD
  async createNewProduct(
    productName: string,
    sku: string,
    urlKeyInput : string,
    price?: string,
    category?: string,
    quantity?: string,
    
  ): Promise<void> {
    await this.click(applocators.dashboard);
    await this.navigateToNewProduct();
    await this.fillBasicProductInfo(productName, sku, price);
    await this.selectCategory(category);
    await this.uploadFile();
    await this.fillSeoInfo(urlKeyInput);
    await this.setProductStatus();
    await this.selectAttributes();
    await this.setInventory(quantity);
    await this.saveProduct();
    await this.verifyProductSaved(productName);
  }

  // Check if product is created and visible in list
  async isProductCreated(productName: string): Promise<boolean> {
    try {
      await this.click(applocators.product.productsLink);
      await this.verifyUrl("http://localhost:3000/admin/products");
      await expect(this.page.getByRole("link", { name: productName, exact: true })).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  // Open product for editing
  async openProductForEditing(productName: string): Promise<void> {
    await this.page.getByRole("link", { name: productName, exact: true }).click();
    
   
  }
}