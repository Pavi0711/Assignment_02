import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export class DatabaseHelper {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  // -------------------- PRODUCT OPERATIONS --------------------

  async createProduct(name: string, description: string) {
  const result = await this.client.query(
    `
    INSERT INTO product_description (name, description)
    VALUES ($1, $2)
    RETURNING product_description_product_id;
    `,
    [name, description]
  );

  return result.rows[0].product_description_product_id;
}

  async updateProductName(productId: number, newName: string) {
    const result = await this.client.query(
      `
        UPDATE product_description
        SET name = $1
        WHERE product_description_id = $2
        RETURNING name
      `,
      [newName, productId]
    );
    return result.rows[0]?.name;
  }

  async updateProductDescription(productId: number, newDesc: string) {
    const result = await this.client.query(
      `
        UPDATE product_description
        SET description = $1
        WHERE product_description_id = $2
        RETURNING description
      `,
      [newDesc, productId]
    );
    return result.rows[0]?.description;
  }

  async deleteProduct(productId: number) {
    const result = await this.client.query(
      `
        DELETE FROM product_description
        WHERE product_description_id = $1
        RETURNING product_description_id
      `,
      [productId]
    );
    return result.rows[0]?.product_description_id;
  }

  async getProduct(productId: number) {
    const result = await this.client.query(
      `
        SELECT * FROM product_description
        WHERE product_description_id = $1
      `,
      [productId]
    );
    return result.rows[0];
  }

  // -------------------- CLEANUP --------------------
  async cleanupTestData() {
    await this.client.query(`
      DELETE FROM product_description
      WHERE name LIKE 'Samsung%' OR name LIKE 'Test Product%'
    `);
  }
}
