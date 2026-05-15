# BudgetNest

BudgetNest is a personal finance management system that helps users track income, expenses, categories, budgets, and financial reports in one dashboard.

The system allows users to register, log in, manage their transactions, view monthly financial summaries, track budget limits by category, and export expense data.

## Features

- User registration and login
- Protected user dashboard
- Add, edit, and delete income records
- Add, edit, and delete expense records
- Use categories for income and expenses
- View monthly income, expenses, and balance
- View budget limits by category
- Track remaining budget amounts
- View financial reports with charts
- Filter transaction history by category and period
- Export expenses to CSV
- Admin panel for managing users and categories

## How to Register

1. Open the application.
2. Click **Get Started** on the landing page or go to the sign-up page.
3. Fill in the registration form:
   - Full Name
   - Email
   - Password
4. Click **Create Account**.
5. After successful registration, the system will show a success message and redirect you to the login page.

Password must be at least 3 characters long. Email must be in a valid email format.

## How to Log In

1. Open the login page by clicking **Sign In**.
2. Enter your email address and password.
3. Click **Sign In**.
4. If the login is successful:
   - Regular users are redirected to the user dashboard.
   - Admin users are redirected to the admin panel.

The system stores the logged-in user session and protects dashboard pages from unauthenticated access.

## User Dashboard

After logging in as a user, you can access the main dashboard.

The dashboard includes:

- Monthly financial overview
- Income, expenses, and balance summaries
- Budget limits by category
- Add income form
- Add expense form
- Financial chart
- Transaction history
- Category and period filters
- CSV export button

## How to Add Income

1. Log in to your account.
2. Open the dashboard.
3. Click or expand the **Add Income** section.
4. Fill in the income form:
   - Amount
   - Description
   - Date
   - Category
5. Click **Save Transaction**.
6. If the income is saved successfully, a success message will appear.

Income amount must be a positive number. Date and category are required.

## How to Edit Income

1. Go to the **Transaction History** section.
2. Find the income record you want to update.
3. Click **Edit**.
4. Update the needed fields:
   - Amount
   - Description
   - Date
   - Category
5. Click **Save Changes**.
6. The income record will be updated.

## How to Delete Income

1. Go to the **Transaction History** section.
2. Find the income record you want to remove.
3. Click **Delete**.
4. Confirm the action by clicking **Yes**.
5. The income record will be deleted.

If you do not want to delete it, click **No**.

## How to Add Expenses

1. Log in to your account.
2. Open the dashboard.
3. Click or expand the **Add Expense** section.
4. Fill in the expense form:
   - Amount
   - Description
   - Date
   - Category
5. Click **Save Transaction**.
6. If the expense is saved successfully, a success message will appear.

Expense amount must be a positive number. Date and category are required.

## How to Edit Expenses

1. Go to the **Transaction History** section.
2. Find the expense record you want to update.
3. Click **Edit**.
4. Update the needed fields:
   - Amount
   - Description
   - Date
   - Category
5. Click **Save Changes**.
6. The expense record will be updated.

## How to Delete Expenses

1. Go to the **Transaction History** section.
2. Find the expense record you want to remove.
3. Click **Delete**.
4. Confirm the action by clicking **Yes**.
5. The expense record will be deleted.

If you do not want to delete it, click **No**.

## Categories

Categories are used to organize income and expenses.

The system includes two category types:

- **Income categories**, for example Salary or Freelance
- **Expense categories**, for example Food, Transport, Entertainment, Shopping, Health, and Travel

When adding or editing income, only income categories are shown.

When adding or editing expenses, only expense categories are shown.

Users can filter transaction history by category using the **All Categories** dropdown in the transaction history section.

## Budgets

The dashboard includes a **Budget Limits by Category** section.

This section shows:

- Category name
- Used amount
- Budget limit
- Progress bar
- Remaining budget
- Warning when a limit is exceeded

Default budget limits are created for common expense categories such as Food, Transport, Entertainment, Shopping, Health, and Travel.

The system calculates budget usage based on expenses for the selected month.

## Reports and Charts

BudgetNest includes visual financial reports in the dashboard.

The **Financial Trends** chart shows:

- Income
- Expenses
- Running balance

The chart is based on the selected month and updates when transactions change.

Above the chart, the system also displays totals for:

- Monthly income
- Monthly expenses
- Monthly balance

## Filtering Transactions

The **Transaction History** section allows users to filter transactions.

Users can filter by:

- Category
- Period

To filter by period:

1. Click **Filter by period**.
2. Select transaction type:
   - Income
   - Expense
3. Choose a start date.
4. Choose an end date.
5. Apply the filter.

The system displays the filtered transactions and the total amount for the selected period.

## Exporting Expenses

Users can export expenses to a CSV file.

To export expenses:

1. Go to the dashboard.
2. Select the needed month.
3. Click **Export CSV**.
4. The system downloads a file named `expenses.csv`.

The exported data is based on the selected date range.

## Admin Panel

Admin users are redirected to the admin panel after login.

The admin panel allows administrators to:

- View all users
- Create users
- Edit users
- Delete users
- View total registered users
- Manage categories
- View system logs

## Managing Categories as Admin

Admins can manage categories from the admin panel.

Admins can:

- Create a new category
- Select category type: income or expense
- Edit existing categories
- Delete categories

To create a category:

1. Open the admin panel.
2. Go to **Create New Category**.
3. Enter the category name.
4. Select the category type.
5. Click **Create**.

To edit or delete a category, use the **Edit** or **Delete** buttons in the category list.

## Demo Accounts

The database includes demo users.

Regular user:

- Email: `Cole@gmail.com`
- Password: `123456`

Admin user:

- Email: `admin@admin.com`
- Password: `admin`

## Running the Project

The project contains a frontend, backend, and PostgreSQL database.

Main services:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL

To run the project with Docker:

```bash
docker compose up --build
Frontend runs on:

http://localhost:5173
Backend runs on:

http://localhost:3000
pgAdmin runs on:

http://localhost:5050
To stop the project:

docker compose down
To stop the project and remove database volumes:

docker compose down -v
Documentation Maintenance
This documentation should be updated whenever system functionality changes.

Examples of changes that require README updates:

New dashboard features
Changed login or registration flow
New transaction fields
Category or budget behavior changes
New reports or export options
Admin panel updates
Keeping this documentation updated helps users understand how to use BudgetNest correctly and effectively.