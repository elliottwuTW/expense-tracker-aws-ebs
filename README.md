## Expense Tracker

An expense tracker app that can manage your wallet.

### Main Page

![](https://raw.githubusercontent.com/elliottwuTW/expense-tracker-app/master/project_picture.png)

### Features

Users can

- register an account with an email only
- login with email and password
- login with facebook or google accounts
- logout accounts
- see the duration of records by month
- create a new expense/income record
- browse the records by filtering record type, time, category, or the way of sorting
- update a specific record
- delete a specific record
- see the balance by month
- keep the same filter setting when returning to the main page

### Demo

[廣志の私帳](https://ac-expense-tracker.herokuapp.com/)

### Mock Account

- email: user@example.com
- password: 12345678

### Usage

```bash
# Create a project folder to start
mkdir <project-folder>
cd <project-folder>

# Clone the project
git clone https://github.com/elliottwuTW/expense-tracker-app.git

# Install all dependencies
npm install

# Follow .env.example to setup your .env
touch .env

# Setup your mongodb and check connection
node ./config/mongoose.js

# Generate the seed data
npm run seed

# Run the Express server
npm run start

# Or run the server with nodemon
npm run dev
```

### Package Version

- Node.js : 14.4.0
- express : 4.17.1
- express-handlebars : 5.1.0
- mongoose : 5.10.9
- migrate-mongo : 8.1.4
- passport : 0.4.1

### App Info

#### Author

[elliottwuTW](https://github.com/elliottwuTW)

#### Version

1.2.0
