
```markdown
# Oceanic Harmony - Backend

## Description
REST API to manage users, challenges, and questions, with JWT-based authentication.

## Technologies
- Node.js + Express
- MySQL
- JWT
- dotenv

## Installation
```bash
git clone https://github.com/ro-agusti/oceanic-harmony-app.git
cd oceanic-harmony-app
npm install
Configuration
Create a .env file in the root:
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=oceanic_harmony
JWT_SECRET=my_secret
PORT=3000
Running the API
npm run dev
Main Endpoints
Users
Method	Endpoint	Description	Body / Headers
POST	/api/users/register	Register a user	{ "username": "user", "password": "pass" }
POST	/api/users/login	Login	{ "username": "user", "password": "pass" } → Returns JWT
Challenges
Method	Endpoint	Description	Body / Headers
GET	/api/challenges	List all challenges	Header: Authorization: Bearer <JWT>
POST	/api/challenges	Create a challenge	{ "title": "Challenge 1", "description": "..." }
Questions
Method	Endpoint	Description	Body / Headers
GET	/api/questions	List all questions	Header: Authorization: Bearer <JWT>
POST	/api/questions	Create a question	{ "question": "Question?", "answer": "Answer" }
Challenge-Questions
Method	Endpoint	Description	Body / Headers
GET	/api/challenge-questions/:challengeId	List questions assigned to a challenge	Header: Authorization: Bearer <JWT>
POST	/api/challenge-questions	Assign a question to a challenge	{ "challengeId": 1, "questionId": 2 }
Example cURL Request
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"admin123"}'