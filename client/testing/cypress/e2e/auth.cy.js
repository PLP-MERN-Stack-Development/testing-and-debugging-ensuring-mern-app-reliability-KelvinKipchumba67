// client/cypress/e2e/auth.cy.js

describe('Authentication Flow', () => {

  // This will run before each test in this describe block
  beforeEach(() => {
    // Start at the homepage
    cy.visit('/');
  });

  it('should redirect unauthenticated users from a protected route', () => {
    // Try to visit a protected route (e.g., create a post)
    cy.visit('/create-post');
    
    // Assert that we are redirected to the login page
    cy.url().should('include', '/login');
    cy.contains('You must be logged in').should('be.visible');
  });

  it('should allow a user to log in and redirect to the dashboard', () => {
    // Navigate to the login page
    cy.visit('/login');

    // Find the form elements, type in credentials, and submit
    // We use [name="..."] as a robust selector
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // -- Assertions --
    // After login, we should be on the dashboard (or homepage)
    cy.url().should('include', '/dashboard'); 
    
    // We should see a welcome message or the user's name
    cy.contains('Welcome, testuser').should('be.visible');
    
    // We should no longer see the "Login" link
    cy.contains('Login').should('not.exist');
    cy.contains('Logout').should('be.visible');
  });

  it('should allow a logged-in user to log out', () => {
    // -- Arrange (Login first) --
    // We can re-use the login steps, or use a custom command (advanced)
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Ensure login was successful
    cy.url().should('include', '/dashboard');
    cy.contains('Logout').should('be.visible');

    // -- Act (Logout) --
    cy.contains('Logout').click();

    // -- Assert --
    // We should be back on the homepage or login page
    cy.url().should('eq', 'http://localhost:5174/'); // Or '/login'
    
    // The "Login" link should be visible again
    cy.contains('Login').should('be.visible');
    cy.contains('Logout').should('not.exist');
  });
});