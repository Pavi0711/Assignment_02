export const testData = {
  user: {
    name: "Gajanan Bhange",
    email: "gajanan@example.com",
    password: "Gatha1013@",
  },
  admin: {
    name: "Super Admin",
    email: "admin@admin.com",
    password: "Gatha1013@",
  },
  product: {
    create: {
      name: "TestProduct888",
      sku: "TP088",
      price: "999",
      category: "Electronics",
      description: "Sample Description",
      quantity: "50",
      urlKeyInput: "test-product-888",
    },
    update: {
      name: "UpdatedProduct777",
      sku: "UP077"
    },
    category: ["Men", "Women", "Kids"],
    attributes: {
      Color: ["White", "Black", "Yellow"],
      Size: ["XXL", "XL", "SM"],
    },
  },
  images: {
    sample1: "tests/resources/images/sample_image1.png"
  }
};

// Generate random product data
export const generateProductData = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return {
    name: `TestProduct${timestamp}`,
    updatedName: `UpdatedProduct${timestamp}${randomSuffix}`,
    sku: `TP${timestamp}`,
    urlKeyInput: `test-product-${timestamp}`,
    price: (Math.random() * 1000 + 100).toFixed(2)
  };
};