
## **Title**
Personal Finance Management System

## Description
The Personal Finance Management System is an application designed to help users track and manage their finances. 
It provides a user-friendly dashboard to monitor total balances, categorize expenses, track goals, and manage bills.
The system also includes features to add transactions, bank accounts, set financial goals, and generate insightful reports, such as pie charts and bar charts.

## Features
**Dashboard**: Displays total amount of the user's finances, a pie chart of transaction categories (e.g., food, shopping), recent transactions, upcoming bills, and monthly expenses (debits and credits bar chart).  
**Transaction Management**: Users can add transaction details, including type, name, date, and amount.  
**Account Management**: Users can add bank accounts, including balance, expiry date, CVV, account name, and more.  
**Goal Management**: Users can set financial goals by adding descriptions and monetary targets.  
**Bill Management**: Users can add bills, including bill name, description, amount, and due date.  
**Expense Management**: Displays bar charts showing debits and credits for the year based on transactions.

## Installation

Follow these steps to set up the Personal Finance Management System locally on your machine.

### Step 1: Clone the Repository

Start by cloning the repository to your local machine using git.

```bash
git clone https://github.com/ViswaniDonthu/PersonalFinanceManagementSystem.git
```

This will create a local copy of the repository on your computer.

### Step 2: Install Backend Dependencies

The backend is located in the **FSM** folder, which contains several subfolders:  
- **Controller**: Contains API controllers.  
- **Service**: Contains the business logic.  
- **Entity**: Contains entity classes that map to the database.  
- **Repo**: Contains data repositories for accessing the database.  
- **Configuration**: Contains configuration files for setting up Spring Boot.

Ensure you have **Java 11** or above and **Maven** installed on your machine.

To install the backend dependencies, follow these steps:

1. Navigate to the `FSM` directory:

```bash
cd PersonalFinanceManagementSystem/FSM
```

2. Install the necessary dependencies using Maven. If you don’t have Maven installed, you can get it from [here](https://maven.apache.org/download.cgi).

Run the following command:

```bash
./mvnw install
```

For Windows, use:

```bash
mvnw.cmd install
```

This will install the required dependencies for the backend.

### Step 3: Install Frontend Dependencies

The frontend code is located in the **FrontendFSM** folder inside the **FSM** folder.

To set up the frontend:

1. Navigate to the `FrontendFSM` directory:

```bash
cd PersonalFinanceManagementSystem/FSM/FrontendFSM
```

2. Install the required dependencies for React by running:

```bash
npm install
```

Make sure **Node.js** and **npm** are installed. You can download and install Node.js from [here](https://nodejs.org/).

### Step 4: Set Up the Database

Make sure you have a MySQL or PostgreSQL database set up locally.

1. Set up the database and create a database (e.g., `personal_finance_db`).
2. Update the `application.properties` or `application.yml` file inside the **FSM** folder, where you configure the connection to your database.

Example configuration for **MySQL**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/personal_finance_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### Step 5: Run the Backend

1. Open the terminal and navigate to the **FSM** folder if you're not already there:

```bash
cd PersonalFinanceManagementSystem/FSM
```

2. To start the Spring Boot backend application, run the following command:

```bash
./mvnw spring-boot:run
```

For Windows, use:

```bash
mvnw.cmd spring-boot:run
```

This will start the Spring Boot server, which will be available at `http://localhost:9000` by default (or port `8080` if not customized).

### Step 6: Run the Frontend

1. Open a new terminal window and navigate to the **FrontendFSM** folder:

```bash
cd PersonalFinanceManagementSystem/FSM/FrontendFSM
```

2. Run the React development server with:

```bash
npm start
```

This will start the React development server, and your frontend will be available at [http://localhost:5173](http://localhost:5173).

### Step 7: Access the Application

- **Frontend (React)**: [http://localhost:5173](http://localhost:5173)
- **Backend (Spring Boot)**: [http://localhost:9000](http://localhost:9000)

Now, open your web browser and go to [http://localhost:5173](http://localhost:5173) to access the **Personal Finance Management System**.

### Step 8: Troubleshooting

If you face issues during installation or running the application, check the following:

1. **Backend not starting**: Ensure that the backend server is running on the correct port. Check Spring Boot logs for errors.
2. **Frontend not loading**: Ensure the React app is running and there are no errors in the browser's console or terminal.
3. **Database connection errors**: Verify the database is running and that the database configuration is correct.
4. **CORS Issues**: Ensure CORS is properly configured in the backend to allow frontend communication.

## Usage

Once the application is running, you can:

- **Dashboard**: View your total balance, expenses, and income in a visually intuitive dashboard with pie charts for categorized spending and bar charts for monthly expenses.
- **Transaction Management**: Add new transactions with details such as type, name, date, and amount.
- **Account Management**: Link your bank accounts to the system and manage balance, account name, expiry date, CVV, etc.
- **Goal Management**: Set and track personal financial goals.
- **Bill Management**: Add upcoming bills with due dates and amounts.
- **Expense Management**: View an annual breakdown of your credits and debits.

## Contributing

We welcome contributions to the **Personal Finance Management System**! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

### Bug Reports and Feature Requests

- **Bug Reports**: If you find any bugs, please open an issue with the details and steps to reproduce.
- **Feature Requests**: Feel free to submit feature requests or suggestions for new functionalities.

