/// <reference types="cypress" />

/**Apply same input to all input boxes*/
function applyAll(str) {
  cy.get("[id = individual-1-1]").type(str);
  cy.get("[id = individual-1-2]").type(str);
  cy.get("[id = individual-1-3]").type(str);
  cy.get("[id = individual-1-4]").type(str);
  cy.get("[id = individual-1-5]").type(str);
  cy.get("[id = individual-1-6]").type(str);
  cy.get("[id = individual-1-7]").type(str);
}

/**Apply unique input to all input boxes */
function applyEach(s1, s2, s3, s4, s5, s6, s7) {
  cy.get("[id = individual-1-1]").type(s1);
  cy.get("[id = individual-1-2]").type(s2);
  cy.get("[id = individual-1-3]").type(s3);
  cy.get("[id = individual-1-4]").type(s4);
  cy.get("[id = individual-1-5]").type(s5);
  cy.get("[id = individual-1-6]").type(s6);
  cy.get("[id = individual-1-7]").type(s7);
}

context("Get to cycle 1", () => {
  beforeEach(() => {
    cy.visit("https://cycle.dia-sandbox.govt.nz/");
    cy.contains("a", "1").click();
  });

  describe("Enter wrong input", () => {
    it("deny enter nothing", () => {
      cy.get("[id^= individual-1-]").clear();
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter zero", () => {
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter letter", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("a");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter letter with number", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("1a");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 7");
    });

    it("deny enter cap letter", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("B");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter cap with number", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("1B");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 7");
    });

    it("deny enter char", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("!");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 0");
    });

    it("deny enter char with number", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("1!");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 7");
    });

    it("deny enter decimal number", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("0.5");
      cy.get("[type = submit]").click("");
      cy.url().should("include", "/cycle/1");
    });

    it("deny decimal scientific notation", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("10e-2");
      cy.get("[type = submit]").click("");
      cy.url().should("include", "/cycle/1");
    });

    it("deny enter negative number", () => {
      cy.get("[id^= individual-1-]").clear();
      applyAll("-1");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 0");
    });
  });

  describe("Test calculations", () => {
    it("More than 7 day 1", () => {
      cy.get("[id = individual-1-1]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 2", () => {
      cy.get("[id = individual-1-2]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 3", () => {
      cy.get("[id = individual-1-3]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 4", () => {
      cy.get("[id = individual-1-4]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 5", () => {
      cy.get("[id = individual-1-5]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 6", () => {
      cy.get("[id = individual-1-6]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 7 day 7", () => {
      cy.get("[id = individual-1-7]").type("8");
      cy.get("[type = submit]").click();
      cy.contains("retry");
    });

    it("More than 30 per week", () => {
      applyAll("5");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 30");
    });

    it("correct input", () => {
      applyAll("2");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 14");
    });

    it("correct input", () => {
      applyEach("2", "0", "1", "2", "5", "2", "3");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 15");
    });
  });
});
