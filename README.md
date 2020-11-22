## Expense Tracker

An expense tracker app that can manage your wallet.

### Main Page

![](https://raw.githubusercontent.com/elliottwuTW/expense-tracker-app/master/project_picture.png)

### Features

User can

- register an account with an email only
- login with email and password
- login with facebook accounts
- logout accounts
- view the matched expenses corresponding to the filter setting
- see the duration of expense records
- filter the expense records by setting year/month, tag, or sort ways
- create a new expense record
- update a specific expense record information
- delete a specific expense record
- keep their filter setting after returning to the main page

### Demo

[廣志の私帳](https://ac-expense-tracker.herokuapp.com/)

### Mock Account

- email: user@example.com
- password: 12345678

### Quick Start

```
# Create a project folder to start
mkdir <project-folder>
cd <project-folder>

# Clone the project
git clone https://github.com/elliottwuTW/expense-tracker-app.git

# Install all dependencies
npm install

# Generate the seed data
npm run seed

# Run the Express server
npm run start

# Or run the server with nodemon
npm run dev
```

### Package Versions

- Node.js : 14.4.0
- express : 4.17.1
- express-handlebars : 5.1.0
- mongoose : 5.10.9
- passport : 0.4.1

### App Info

#### Author

Elliott Wu [elliottwuTW](https://github.com/elliottwuTW)

#### Version

1.1.0
