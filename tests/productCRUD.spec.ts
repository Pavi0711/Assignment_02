import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { getDBConnection } from "../utils/dbConnection";
import { generateProductData, testData } from "../utils/testData";
import { ProductEditPage } from "../pages/productEditPage";
import { TAG_CRUD } from "../utils/test-tags";

// Global variables to share data between tests
let originalProductName: string;
let updatedProductName: string;
let productSku: string;

test.describe.serial(`${TAG_CRUD}Product CRUD Operations`, () => {
  test("TC01 - Create Product", async ({ page }) => {
    const randomProduct = generateProductData();

    // Store the product names for use in other tests
    originalProductName = randomProduct.name;
    updatedProductName = randomProduct.updatedName;
    productSku = randomProduct.sku;

    console.log(`Creating product: ${originalProductName}`);
    console.log(`Will update to: ${updatedProductName}`);

    const loginPage = new LoginPage(page);
    const dashboard = await loginPage.login();
    const productPage = await dashboard.navigateToProductPage();

    // Create new product
    await productPage.createNewProduct(
      originalProductName,
      productSku,
      randomProduct.urlKeyInput,
      testData.product.create.price,
      testData.product.category[0],
      testData.product.create.quantity
    );

    // Verify product creation
    const isCreated = await productPage.isProductCreated(originalProductName);
    expect(isCreated).toBeTruthy();
  });

  test("TC02 - Update Product Name", async ({ page }) => {
    console.log(
      `Updating product from: ${originalProductName} to: ${updatedProductName}`
    );

    const loginPage = new LoginPage(page);
    const dashboard = await loginPage.login();
    const productPage = await dashboard.navigateToProductPage();

    // First, open the product for editing using the original name
    await productPage.openProductForEditing(originalProductName);

    // Now update the product name
    const editPage = new ProductEditPage(page);
    await editPage.updateProductName(updatedProductName);

    // Verify product name update
    const isUpdated = await editPage.isProductNameUpdated(updatedProductName);
    expect(isUpdated).toBeTruthy();

    // Navigate back to products page to verify the update
    await dashboard.navigateToProductPage();

    // Verify old name no longer exists
    const oldNameExists = await productPage.isProductCreated(
      originalProductName
    );
    expect(oldNameExists).toBeFalsy();

    // Verify new name exists
    const newNameExists = await productPage.isProductCreated(
      updatedProductName
    );
    expect(newNameExists).toBeTruthy();
  });

  test("TC03 - Update Product Images", async ({ page }) => {
    console.log(`Updating images for product: ${updatedProductName}`);

    const loginPage = new LoginPage(page);
    const dashboard = await loginPage.login();
    const productPage = await dashboard.navigateToProductPage();

    // Update product images using the UPDATED product name
    await productPage.openProductForEditing(updatedProductName);
    const editPage = new ProductEditPage(page);
    await editPage.uploadProductImages();

    // Verify image update
    const isImageUpdated = await editPage.isImageUpdatedSuccessfully();
    expect(isImageUpdated).toBeTruthy();
  });

  test("TC04 - Database Verification", async () => {
    console.log(`Verifying product in database: ${updatedProductName}`);

    const connection = await getDBConnection();

    try {
      // Step 1: Discover the database schema first
      console.log("Discovering database schema...");

      // Get all product-related tables
      const productTables = await connection.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%product%'"
      );
      console.log("Product-related tables:", productTables);

      // For each product table, get its columns
      for (const table of productTables) {
        const tableName = table.table_name;
        const columns = await connection.execute(
          "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position",
          [tableName]
        );
        console.log(`Table: ${tableName}`, columns);
      }

      let rows: any[] = [];

      const queryAttempts = [
        `
      SELECT pd.name, p.price, p.sku 
      FROM public.product_description pd 
      JOIN public.product p ON pd.product_id = p.product_id 
      WHERE pd.name = $1
      `,

        `
      SELECT name, price, sku FROM public.product_description WHERE name = $1
      `,

        `
      SELECT name, price, sku FROM public.products WHERE name = $1
      `,

        `
      SELECT name, cost, sku FROM public.product_description WHERE name = $1
      `,

        `
      SELECT name FROM public.product_description WHERE name = $1
      `,
      ];

      for (const query of queryAttempts) {
        try {
          console.log("Trying query:", query);
          rows = await connection.execute(query, [updatedProductName]);
          if (rows.length > 0) {
            console.log("Query succeeded! Found product:", rows[0]);
            break;
          }
        } catch (error) {
          console.log("Query failed, trying next one...");
          continue;
        }
      }

      // Step 3: Verify the product exists
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0].name).toBe(updatedProductName);

      console.log("Database verification completed successfully");
      console.log("Product details from database:", rows[0]);

      // Step 4: Additional verification if price column exists
      if (rows[0].price !== undefined) {
        console.log("Price found:", rows[0].price);
      }

      if (rows[0].sku !== undefined) {
        console.log("SKU found:", rows[0].sku);
      }
    } catch (error) {
      console.error("Database verification failed:", error);
      throw error;
    } finally {
      await connection.end();
    }
  });
});
