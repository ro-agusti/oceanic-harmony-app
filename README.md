
# Oceanic Harmony

Oceanic Harmony is an application designed to offer wellness challenges and improve self-confidence through intuitive and dynamic tools. The application includes features such as user management, challenge (journal) purchases, viewing purchased challenges, and managing questions associated with each challenge.

---

## Prerequisites

Before getting started, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

Also, make sure you have a `.env` file configured with the following variables:

```
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=oceanic_harmony
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/ro-agusti/oceanic-harmony-app
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your database:

Make sure your MySQL server is running and execute the following command to synchronize the models:

```bash
npm run sync-db
```

---

## Available Scripts

### Start the server

```bash
npm start
```

This command starts the server in production mode.

### Synchronize models with the database

```bash
npm run sync-db
```

This script synchronizes the models with the database, creating or updating tables according to the defined models.

### Create a base challenge

```bash
npm run create-challenge
```

This script creates a base challenge in the `challenges` table with predefined data.

---

## Main Endpoints

### Users

- **Register user**: `POST /api/signup`
  - Required data: `name`, `email`, `password`
- **Login**: `POST /api/login`
  - Required data: `email`, `password`
- **Profile**: `GET /api/profile`
  - Requires authentication via token (JWT).

### Challenges

- **Get all challenges**: `GET /api/challenges`
- **Create a challenge**: `POST /api/challenges`
  - Required data: `title`, `description`, `price`, `days`
- **View purchased challenges**: `GET /api/purchased`
  - Requires authentication via token (JWT).

---

## Create a Challenge from Scripts

You can create base challenges from the `scripts/createChallenge.js` script. Ensure that the database is configured and run:

```bash
npm run create-challenge
```

This script will create a challenge with the following data:

```javascript
{
    title: '21-Day Gratitude Challenge',
    description: 'A challenge to cultivate gratitude over 21 consecutive days.',
    price: 15.99,
    days: 21
}
```

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **ORM**: Sequelize

---

## Future Features

- Implement integrated payment for challenge purchases.
- Notification and reminder system.
- Graphical interface for challenge management.
