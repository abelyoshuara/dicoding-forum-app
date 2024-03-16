/**
 * scenario testing
 *
 * - threadDetail spec
 *   - should display 'Not Found' when on route '/threads'
 *   - should display 'thread tidak ditemukan' when on route '/threads/thread-1'
 *   - should display thread detail when thread id is exists in server
 */

describe("threadDetail spec", () => {
  it("should display 'Not Found' when on route '/threads", () => {
    cy.visit("/threads");
    cy.contains("Not Found").should("be.visible");
  });

  it("should display 'thread tidak ditemukan' when on route '/threads/thread-1'", () => {
    cy.visit("/threads/thread-1");

    // throw new Error('thread tidak ditemukan')
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("thread tidak ditemukan");
      return false;
    });
  });

  it("should display thread detail when thread id is exists in server", () => {
    cy.visit("/threads/thread-91KocEqYPRz68MhD");

    // not throw new Error('thread tidak ditemukan')
    cy.on("uncaught:exception", (err) => {
      expect(err.message).not.to.include("thread tidak ditemukan");
      return false;
    });
  });
});
