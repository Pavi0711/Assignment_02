<<<<<<< HEAD
Eversop Product CRUD Automation
Author : Gajanan Vilas Bhange
📋 Project Overview
This project automates Complete CRUD (Create, Read, Update, Delete) operations for the Product Management module in the Eversop application using Playwright with TypeScript and Page Object Model (POM) framework.

🎯 Objective
Automate end-to-end product management workflow including:

Product Creation

Product Name Update

Product Images Update

Database Verification

🛠️ Technology Stack
Automation Tool: Playwright

Language: TypeScript

Framework: Page Object Model (POM)

Testing Framework: Playwright Test

Reporting: Allure Reports

Database: PostgreSQL with pg client

📁 Project Structure
text
Eversop-Automation/
│
├── tests/
│   ├── productCRUD.spec.ts          # Main CRUD test suite
│   
│   └── locators/
│       └── subscription.locator.ts   # Application locators
│
├── pages/                           # Page Object Model
│   ├── basePage.ts                  # Base page class
│   ├── loginPage.ts                 # Login page actions
│   ├── dashboardPage.ts             # Dashboard navigation
│   ├── productPage.ts               # Product management
│   └── productEditPage.ts           # Product editing
│
├── utils/
│   ├── dbConnection.ts              # Database utilities
│   ├── testData.ts                  # Test data management
│   ├── env.ts                       # Environment configuration
│   └── test-tags.ts                 # Test categorization tags
│
├── playwright.config.ts             # Playwright configuration
├── .env                             # Environment variables
└── package.json                     # Dependencies and scripts
🚀 Installation & Setup
Prerequisites
Node.js (v16 or higher)

PostgreSQL database

Eversop application running

1. Clone and Install Dependencies
bash
# Clone the repository
git clone <repository-url>
cd Eversop-Automation

# Install dependencies
npm install
2. Install Playwright Browsers
bash
npx playwright install
3. Environment Configuration
Create .env file in root directory:

env
# Application URLs
BASE_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=****
DB_USER=postgres
DB_PASSWORD=***PW***
DB_NAME=**your_database**
DB_SSLMODE=disable

# File Upload Path
FILE_UPLOAD_PATH=./tests/resources/images/sample_image1.png
4. Allure Setup
bash
# Install Allure command line
npm install -g allure-commandline

# Or use npx (recommended)
npx allure-commandline --version
🧪 Test Execution
Running Tests
1. Run Complete CRUD Suite
bash
# Run all CRUD tests
npm run test:crud

# Run with UI mode (watch tests execute)
npm run test:crud-headed

# Run with Allure reporting
npm run test:crud-allure
2. Run by Tags
bash
# Run only CRUD tests
npx playwright test --grep "@crud"

# Run specific test cases
npx playwright test -g "TC01 - Create Product"
3. Run with Different Browsers
bash
# Run on specific browser
npx playwright test tests/productCRUD.spec.ts --project=chromium
npx playwright test tests/productCRUD.spec.ts --project=firefox
npx playwright test tests/productCRUD.spec.ts --project=webkit
4. Debug Mode
bash
# Run with debug mode
npx playwright test tests/productCRUD.spec.ts --debug

# Run with trace
npx playwright test tests/productCRUD.spec.ts --trace=on
Test Cases
TC ID	Test Case	Description	Tags
TC01	Create Product	Create new product with all required fields	@crud, @p1
TC02	Update Product Name	Modify product name after creation	@crud, @p1
TC03	Update Product Images	Upload/replace product images	@crud, @p1
TC04	Database Verification	Verify product details in database	@crud, @p1
📊 Reporting
Allure Reports Generation
bash
# Generate and open Allure report
npm run test:allure-report

# Complete test execution with report generation
npm run test:crud-full
Allure Report Includes
✅ Test execution history

📸 Screenshots on failure

🔍 Step-by-step execution details

📈 Trends and analytics

🗂️ Environment information

📋 Test categorization

🔧 Configuration
Playwright Configuration (playwright.config.ts)
Key configurations:

Sequential test execution

Allure reporter integration

Screenshot on failure

Trace collection

Multiple browser support

Test Data Management (utils/testData.ts)
Dynamic product name generation

Admin credentials

Product categories and attributes

Test data utilities

Database Configuration (utils/dbConnection.ts)
PostgreSQL connection setup

Parameterized queries

Schema discovery utilities

Connection pooling

🏗️ Framework Features
Page Object Model (POM)
BasePage: Common utilities and locators

LoginPage: Authentication flows

DashboardPage: Navigation methods

ProductPage: Product creation and listing

ProductEditPage: Product modification

Key Utilities
Dynamic Test Data: Unique product names for each run

Environment Management: Centralized configuration

Database Integration: End-to-end data verification

Tagging System: Test categorization and filtering

🐛 Troubleshooting
Common Issues
1. Database Connection Issues
bash
# Verify database connection
npm run test:discover-schema
2. Element Not Found
Check application URL in .env

Verify locators in subscription.locator.ts

Run in headed mode to see execution

3. Allure Report Not Generating
bash
# Clean and regenerate reports
npx allure generate ./allure-results --clean -o ./allure-report
Debug Commands
bash
# Run with detailed logs
DEBUG=pw:api npx playwright test tests/productCRUD.spec.ts

# Run with slow motion
npx playwright test tests/productCRUD.spec.ts --slow-mo=1000

# Run with video recording
npx playwright test tests/productCRUD.spec.ts --video=on
📝 Scripts Reference
Package.json Scripts
json
{
  "test:crud": "Run complete CRUD test suite",
  "test:crud-headed": "Run CRUD tests with browser UI",
  "test:crud-allure": "Run CRUD tests with Allure reporting",
  "test:crud-tagged": "Run tests with @crud tag",
  "test:allure-report": "Generate and open Allure report",
  "test:crud-full": "Complete test execution with report generation",
  "test:discover-schema": "Discover database schema"
}
🤝 Best Practices
Test Development
Use Page Object Model for maintainability

Implement proper error handling

Use dynamic test data to avoid conflicts

Add meaningful assertions and validations

Include database verification for data integrity

Execution
Run tests sequentially for CRUD operations

Use Allure reports for detailed analysis

Implement proper cleanup after tests

Use tags for test organization

=======
# Assignment_02_Evershop_project
Assignment: Full CRUD Automation Use Case in POM Framework (Playwright + TypeScript + Allure)
>>>>>>> 5869033e7d7f22a3b212e13f1c5fa8a674f63b9e
