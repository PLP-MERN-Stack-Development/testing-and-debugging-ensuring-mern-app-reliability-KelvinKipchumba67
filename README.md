# MERN App Testing and Debugging

## This project focuses on implementing a comprehensive testing strategy for a MERN stack application. It includes unit tests, integration tests, and end-to-end (E2E) tests to ensure application reliability and stability.

The server-side and client-side applications were built from scratch following a Test-Driven Development (TDD) approach, where the provided test files (posts.test.js, Button.test.jsx) were used as the requirements to build the application logic.

Setup and Installation
Clone the repository:

Bash

git clone <your-repository-url>
cd <repository-name>
Install All Dependencies: This project uses separate node_modules for the client and server.

Server:

Bash

cd server
npm install
Client:

Bash

cd client/testing
npm install
Running the Application
To run the application for manual testing or E2E testing, you will need two separate terminals.

Terminal 1: Start the Server

Bash

cd server
npm run dev
This starts the Node.js/Express server on http://localhost:5000.

It also connects to the MongoDB database.

Terminal 2: Start the Client

Bash

cd client/testing
npm run dev
This starts the React (Vite) development server on http://localhost:5174.

Running the Tests
All tests should be run from the root project directory unless specified.

1. Server Integration Tests
   These tests run the full server API against an in-memory test database.

Bash

# From the root directory

npx jest --selectProjects server 2. Client Unit Tests
These tests run the React component tests in isolation using Jest and React Testing Library.

Bash

# From the root directory

npx jest --selectProjects client 3. Client E2E (End-to-End) Tests
This requires the Server (Terminal 1) and Client (Terminal 2) to be running.

Bash

# In a third terminal

cd client/testing
npm run cypress:open
📋 Documentation of Testing Strategy
This project employs a multi-layered testing strategy to ensure reliability from individual components to the full application flow.

1. Unit Testing (Client)
   Framework: Jest with React Testing Library (RTL).

Target: Individual React components in isolation.

Strategy: We test components by verifying their behavior from a user's perspective. The Button.test.jsx file is a prime example, testing:

Rendering: Does the button render with the correct text?

Props: Do variant and size props correctly apply CSS classes?

State: Is the button correctly disabled when the prop is passed?

Events: Does the onClick handler fire when clicked, and not fire when disabled?

2. Integration Testing (Server)
   Framework: Jest with Supertest and mongodb-memory-server.

Target: The entire server-side Express API.

Strategy: This is the core of our backend testing. We treat the API as a black box and test the full request/response lifecycle.

Database: mongodb-memory-server creates a new, blank test database for every test run, ensuring tests are isolated and don't rely on or pollute a development database.

Authentication: The authMiddleware is tested by sending requests with and without a valid JWT, asserting that protected endpoints correctly return 401 Unauthorized or 403 Forbidden status codes.

CRUD Logic: The posts.test.js file covers the entire Post model's lifecycle:

POST /api/posts: Tests post creation and validation (e.g., returning 400 Bad Request for missing fields).

GET /api/posts: Tests fetching all posts, including pagination and filtering.

GET /api/posts/:id: Tests fetching a single post and error handling for non-existent IDs (404 Not Found).

PUT /api/posts/:id: Tests updating a post and authorization (only the author can update).

DELETE /api/posts/:id: Tests deleting a post and authorization.

3. End-to-End (E2E) Testing (Full Stack)
   Framework: Cypress.

Target: Critical user flows through the entire application.

Strategy: This test layer ensures the client and server are correctly integrated. We simulate a real user's actions in a live browser.

auth.cy.js: This test suite validates the complete authentication flow:

Protected Routes: Asserts that a user visiting /create-post is redirected to /login if not authenticated.

Login: Visits /login, types in credentials, submits the form, and asserts the URL changes to /dashboard.

Logout: Clicks the "Logout" button and asserts the user is redirected back to the homepage (/).

Test Coverage Reports
Server (Integration) Test Coverage
All 13 integration tests passed, achieving 84.32% code coverage on the server, exceeding the 70% assignment goal.

Test Results:

PASS server server/tests/integration/posts.test.js
POST /api/posts
√ should create a new post when authenticated (69 ms)
√ should return 401 if not authenticated (6 ms)
√ should return 400 if validation fails (76 ms)
GET /api/posts
√ should return all posts (33 ms)
√ should filter posts by category (15 ms)
√ should paginate results (44 ms)
GET /api/posts/:id
√ should return a post by ID (10 ms)
√ should return 404 for non-existent post (17 ms)
PUT /api/posts/:id
√ should update a post when authenticated as author (21 ms)
√ should return 401 if not authenticated (4 ms)
√ should return 403 if not the author (125 ms)
DELETE /api/posts/:id
√ should delete a post when authenticated as author (20 ms)
√ should return 401 if not authenticated (5 ms)

Test Suites: 1 passed, 1 total
Tests: 13 passed, 13 total
Snapshots: 0 total
Coverage Summary:

--------------------|---------|----------|---------|---------|-------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files | 84.32 | 77.55 | 90.9 | 84.32 |
src | 100 | 50 | 100 | 100 |
app.js | 100 | 50 | 100 | 100 | 23-24
src/controllers | 78.46 | 81.48 | 100 | 78.46 |
postController.js | 78.46 | 81.48 | 100 | 78.46 | 33,61,82,93-95,...
src/middleware | 81.25 | 87.5 | 100 | 81.25 |
authMiddleware.js | 81.25 | 87.5 | 100 | 81.25 | 30,35-36
src/models | 87.5 | 66.66 | 66.66 | 87.5 |
Post.js | 100 | 75 | 100 | 100 | 38
User.js | 81.25 | 50 | 50 | 81.25 | 37,45,52
src/routes | 100 | 100 | 100 | 100 |
posts.js | 100 | 100 | 100 | 100 |
src/utils | 85.71 | 75 | 100 | 85.71 |
auth.js | 85.71 | 75 | 100 | 85.71 | 15
--------------------|---------|----------|---------|---------|-------------------
Screenshots:

You would take a screenshot of the HTML report (usually found in coverage/server/lcov-report/index.html) and place it here.

[Server Coverage Report](./docs/images/image1.png)
[Server Coverage Report](./docs/images/image2.png)
[Server Coverage Report](./docs/images/image3.png)
[Server Coverage Report](./docs/images/image4.png)

Client (Unit) Test Coverage
You would run npx jest --selectProjects client and paste the text output and screenshot here, just like the server one.
