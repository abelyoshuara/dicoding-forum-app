/**
 * scenario testing
 *
 * - Login spec
 *   - should display login page correctly
 *   - should show 'This field is required' when email input is empty
 *   - should show 'This field is required' when password input is empty
 *   - should display "email or password is wrong" when email and password are wrong
 *   - should redirect to HomePage after successful login
 */

describe("Login spec", () => {
  it("should display login page correctly", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should show 'This field is required' when email input is empty", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').clear();
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get('span[data-testid="errEmail"]').should("be.visible");
  });

  it("should show 'This field is required' when password input is empty", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Password"]').clear();
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get('span[data-testid="errPassword"]').should("be.visible");
  });

  it('should display "email or password is wrong" when email and password are wrong', () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').type("adiguna@gmail.com");
    cy.get('input[placeholder="Password"]').type("wrong_password");
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.contains("email or password is wrong").should("be.visible");
  });

  it("should redirect to HomePage after successful login", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').type("adiguna@gmail.com");
    cy.get('input[placeholder="Password"]').type("12341234");
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.url().should("equal", Cypress.config().baseUrl + "/");
  });
});
