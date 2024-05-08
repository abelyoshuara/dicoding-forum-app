/**
 * scenario testing
 *
 * - home spec
 *   - should display home page correctly
 *   - should display threads of list correctly
 *   - should filter threads correctly
 *   - should don't display button add before login
 *   - should display button add after succeed login
 */

describe("home spec", () => {
  it("should display home page correctly", () => {
    cy.visit("/");

    cy.get("#thread-list").should("be.visible");
  });

  it("should display threads of list correctly", () => {
    cy.visit("/");

    cy.get(".card").should("be.visible");

    cy.get(".card-header")
      .contains("Bagaimana pengalamanmu belajar Redux?")
      .should("be.visible");

    cy.get(".card-header")
      .contains("Halo! Selamat datang dan silakan perkenalkan diri kamu")
      .should("be.visible");
  });

  it("should filter threads correctly", () => {
    cy.visit("/");

    cy.get(".chip").should("be.visible");

    cy.contains(".chip", "redux").click();

    cy.contains(".chip", "redux").should("have.class", "active");

    cy.get(".card").each((card) => {
      cy.wrap(card).within(() => {
        cy.get(".badge").should("contain", "redux");
      });
    });
  });

  it("should not display button add before login", () => {
    cy.visit("/");

    cy.get("label.btn[for=modal-1]").should("not.be.visible");
  });

  it("should display button add after succeed login", () => {
    cy.visit("/");

    cy.get(".btn")
      .contains(/^Login$/)
      .click();

    cy.get('input[placeholder="Email"]').type("adiguna@gmail.com");
    cy.get('input[placeholder="Password"]').type("12341234");
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.get("label.btn[for=modal-1]").should("be.visible");
  });
});
