import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { applocators } from "../tests/locators/subscription.locator";
import { testData } from "../utils/testData";
import { ENV } from "../utils/env";
import { DashboardPage } from "./dashboardPage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Login as admin user
  async login(username?: string, password?: string): Promise<DashboardPage> {
    await this.navigateTo(ENV.adminURL);
    await this.fill(applocators.adminEmailInput, username || testData.admin.email);
    await this.fill(applocators.adminPasswordInput, password || testData.admin.password);
    await this.click(applocators.adminSigninButton);
    await this.verifyVisible(applocators.customersLink);
    await this.verifyUrl(`${ENV.baseURL}/admin`);
    return new DashboardPage(this.page);
  }
}