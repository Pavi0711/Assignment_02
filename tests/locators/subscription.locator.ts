import { Locator, Page } from "@playwright/test";

export type RoleLocator = {
  role: Parameters<Page["getByRole"]>[0];
  name?: string;
  exact?: boolean;
};

export const applocators = {
  // Navigation
  navSignup: ".self-center",

  // Signup
  linkCreateAccount: { role: "link", name: "Create an account" } as RoleLocator,
  fullNameInput: { role: "textbox" as const, name: "Full Name" } as RoleLocator,
  emailInput: { role: "textbox" as const, name: "Email" } as RoleLocator,
  passwordInput: { role: "textbox" as const, name: "Password" } as RoleLocator,
  signupButton: { role: "button" as const, name: "SIGN UP" } as RoleLocator,

  // Admin login
  adminEmailInput: { role: "textbox" as const, name: "Email" } as RoleLocator,
  adminPasswordInput: {
    role: "textbox" as const,
    name: "Password",
  } as RoleLocator,
  adminSigninButton: {
    role: "button" as const,
    name: "SIGN IN",
  } as RoleLocator,
  nextButton: ".next",
  coupon: { role: "link", name: "Coupons" } as RoleLocator,
  // Customers page
  customersLink: { role: "link" as const, name: "Customers" } as RoleLocator,
  customerStatus: "text=StatusEnabled",
  startDate: { role: "textbox", name: "Start date" } as RoleLocator,
  endDate: { role: "textbox", name: "End date" } as RoleLocator,
  //newCouponLink: (page:Page) =>
  //page.locator('div').filter({ hasText: /^New Coupon$/ }).getByRole('link'),

  // Coupon management
  newCouponLink: { role: "link", name: "New Coupon" } as RoleLocator,
  couponCodeInput: {
    role: "textbox",
    name: "Enter coupon code",
  } as RoleLocator,
  couponDescriptionInput: {
    role: "textbox",
    name: "Description",
  } as RoleLocator,
  discountAmountInput: {
    role: "textbox",
    name: "Discount amount",
  } as RoleLocator,
  //freeShippingCheckbox: { role: "checkbox", name: "Free shipping?" } as RoleLocator,
  freeShippingCheckbox: (page: Page) =>
    page.locator("label").filter({ hasText: "Free shipping?" }).locator("span"),
  //freeShippingCheckbox: 'label:has-text("Free shipping?") span',
  // discountTypeRadio: (type: string) =>
  //  `label:has-text("${type}") span`,
  discountTypeRadio: (page: Page, type: string) =>
    page.locator(`label:has-text("${type}") span`).first(),
  minPurchaseAmountInput: {
    role: "textbox",
    name: "Enter minimum purchase amount",
  } as RoleLocator,
  minPurchaseQtyInput: {
    role: "textbox",
    name: "Enter minimum purchase qty",
  } as RoleLocator,
  customerGroupDropdown: ".css-8mmkcg",
  customerGroupOption: (group: string) =>
    ({ role: "option", name: group } as RoleLocator),
  customerEmailsInput: {
    role: "textbox",
    name: "Enter customer emails",
  } as RoleLocator,
  purchasedAmountInput: {
    role: "textbox",
    name: "Enter purchased amount",
  } as RoleLocator,
  couponSaveButton: { role: "button", name: "Save" } as RoleLocator,
  successMessage: (page: Page, text: string) =>
    page.getByRole("alert").getByText(text, { exact: true }),
  backButton: (page: Page) =>
    page.getByRole("link").filter({ hasText: /^$/ }).first(),
  couponCell: (code: string) =>
    ({ role: "cell", name: code, exact: true } as RoleLocator),

  // Dynamic data for random email
  dynamicCustomerEmailCell: (email: string): RoleLocator => ({
    role: "cell",
    name: email,
    exact: true,
  }),
dashboard: { role: "link", name: "Dashboard" } as RoleLocator,

  // Product management
  product: {
    newProductLink: { role: "link", name: "New Product" , exact: true} as RoleLocator,
    productsLink: {
      role: "link",
      name: "Products",
      exact: true,
    } as RoleLocator,
    successMessage: {
      role: "alert",
      name: "Product saved successfully!",
    } as RoleLocator,
    nameInput: { role: "textbox" as const, name: "Name" } as RoleLocator,
    skuInput: { role: "textbox" as const, name: "SKU" } as RoleLocator,
    priceInput: { role: "textbox" as const, name: "Price" } as RoleLocator,
    weightInput: { role: "textbox" as const, name: "Weight" } as RoleLocator,
    categoryLink: {
      role: "link" as const,
      name: "Select category",
    } as RoleLocator,
    searchCategory: {
      role: "textbox" as const,
      name: "Search categories",
    } as RoleLocator,
    menSelectButton : (page: Page) =>
    page
      .locator("div")
      .filter({ hasText: /^MenSelect$/ })
      .getByRole("button"),
    taxClassDropdown: "#taxClass",
    urlKeyInput: "#urlKey",
    metaTitleInput: "#metaTitle",
    metaKeywordsInput: "#metaKeywords",
    metaDescriptionInput: {
      role: "textbox" as const,
      name: "Meta description",
    } as RoleLocator,
    disabledToggle: 'label:has-text("Disabled") span',
    enabledToggle: 'label:has-text("Enabled") span',
    visibleToggle: 'label:has-text("Visible") span',
    quantityInput: {
      role: "textbox" as const,
      name: "Quantity",
    } as RoleLocator,
    saveButton: { role: "button" as const, name: "Save" } as RoleLocator,
    selectColor: (page: Page) =>
      page.locator('select[name="attributes[0][value]"]'),
    selectSize: (page: Page) =>
      page.locator('select[name="attributes[1][value]"]'),
    searchInput: (page: Page) =>
      page.getByRole('heading', { name: 'Status Product type' }).getByPlaceholder('Search'),
  },
};

// export function getLocator(page: Page, locator: RoleLocator | string): Locator {
//   if (typeof locator === "string") {
//     return page.locator(locator);
//   }
//   const { role, name, exact } = locator;
//   return page.getByRole(role, { name, exact });
// }
