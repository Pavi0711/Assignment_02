import { Client } from "pg";
import { ENV } from "../utils/env";

export class DBConnection {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: ENV.db.host,
      port: ENV.db.port,
      user: ENV.db.user,
      password: ENV.db.password,
      database: ENV.db.database,
      ssl: ENV.db.ssl
    });
  }

  // Connect to database
  async connect(): Promise<void> {
    await this.client.connect();
    console.log("Connected to PostgreSQL database");
  }

  // Execute query 
  async execute(query: string, params: any[] = []): Promise<any> {
    try {
      const result = await this.client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      console.error('Query:', query);
      console.error('Params:', params);
      throw error;
    }
  }

  // Close connection
  async end(): Promise<void> {
    await this.client.end();
    console.log("Database connection closed");
  }
}


export const getDBConnection = async (): Promise<DBConnection> => {
  const db = new DBConnection();
  await db.connect();
  return db;
};