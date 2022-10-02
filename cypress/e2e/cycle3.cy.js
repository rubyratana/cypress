/// <reference types="cypress" />
/**Apply same input to all input boxes of certain individual*/
function applyAllIndv(indv, str) {
  cy.get("[id = individual-" + indv + "-1]").type(str);
  cy.get("[id = individual-" + indv + "-2]").type(str);
  cy.get("[id = individual-" + indv + "-3]").type(str);
  cy.get("[id = individual-" + indv + "-4]").type(str);
  cy.get("[id = individual-" + indv + "-5]").type(str);
  cy.get("[id = individual-" + indv + "-6]").type(str);
  cy.get("[id = individual-" + indv + "-7]").type(str);
}

/**Checks user points over daily max is denied*/
function indivMax(day) {
  cy.get("[id = individual-1-" + day + "]").type("10");
  cy.get("[type = submit]").click();
  cy.contains("retry");

  cy.visit("https://cycle.dia-sandbox.govt.nz/cycle/3");

  cy.get("[id = individual-2-" + day + "]").type("10");
  cy.get("[type = submit]").click();
  cy.contains("retry");

  cy.visit("https://cycle.dia-sandbox.govt.nz/cycle/3");

  cy.get("[id = individual-3-" + day + "]").type("10");
  cy.get("[type = submit]").click();
  cy.contains("retry");
}

context("Get to cycle 3", () => {
  beforeEach(() => {
    cy.visit("https://cycle.dia-sandbox.govt.nz/");
    cy.contains("a", "3").click();
  });

  describe("Enter wrong input", () => {
    it("deny enter nothing", () => {
      cy.get("[id^= individual-]").clear();
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter zero", () => {
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter letter", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "p");
      applyAllIndv("2", "y");
      applyAllIndv("3", "t");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter letter with number", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "1q");
      applyAllIndv("2", "1g");
      applyAllIndv("3", "1s");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 21");
    });

    it("deny enter cap letter", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "D");
      applyAllIndv("2", "M");
      applyAllIndv("3", "L");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 0");
    });

    it("deny enter cap with number", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "1O");
      applyAllIndv("2", "1U");
      applyAllIndv("3", "1Z");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 21");
    });

    it("deny enter char", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "+");
      applyAllIndv("2", ")");
      applyAllIndv("3", "}");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 0");
    });

    it("deny enter char with number", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "1@");
      applyAllIndv("2", "1!");
      applyAllIndv("3", "1&");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 21");
    });

    it("deny enter decimal number", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "0.9");
      applyAllIndv("2", "0.102");
      applyAllIndv("3", "0.632");
      cy.get("[type = submit]").click("");
      cy.url().should("include", "/cycle/3");
    });

    it("deny decimal scientific notation", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "10e-2");
      applyAllIndv("2", "10e-9");
      applyAllIndv("3", "10e-2");
      cy.get("[type = submit]").click("");
      cy.url().should("include", "/cycle/3");
    });

    it("deny enter negative number", () => {
      cy.get("[id^= individual-]").clear();
      applyAllIndv("1", "-1");
      applyAllIndv("2", "-10");
      applyAllIndv("3", "-11");
      cy.get("[type = submit]").click("");
      cy.contains("Total Household points: 0");
    });
  });

  describe("Test calculations", () => {
    it("More than 7 day 1", () => {
      indivMax("1");
    });

    it("More than 7 day 2 per inidividual", () => {
      indivMax("2");
    });

    it("More than 7 day 3 per inidividual", () => {
      indivMax("3");
    });

    it("More than 7 day 4 per inidividual", () => {
      indivMax("4");
    });

    it("More than 7 day 5 per inidividual", () => {
      indivMax("5");
    });

    it("More than 7 day 6 per inidividual", () => {
      indivMax("6");
    });

    it("More than 7 day 7 per inidividual", () => {
      indivMax("7");
    });

    it("More than 30 per week indv 1", () => {
      applyAllIndv("1", "5");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 30");
    });

    it("More than 30 per week indv 2", () => {
      applyAllIndv("2", "5");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 30");
    });

    it("More than 30 per week indv 3", () => {
      applyAllIndv("3", "5");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 30");
    });

    it("More than 30 per week both indv", () => {
      applyAllIndv("1", "5");
      applyAllIndv("2", "5");
      applyAllIndv("3", "5");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 90");
    });

    it("Calcs correct input indv 1", () => {
      applyAllIndv("1", "1");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 7");
    });

    it("Calcs correct input  indv 2", () => {
      applyAllIndv("2", "1");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 7");
    });

    it("Calcs correct input  indv 3", () => {
      applyAllIndv("3", "1");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 7");
    });

    it("Calcs correct input both", () => {
      applyAllIndv("1", "1");
      applyAllIndv("2", "1");
      applyAllIndv("3", "1");
      cy.get("[type = submit]").click();
      cy.contains("Total Household points: 21");
    });
  });
});
