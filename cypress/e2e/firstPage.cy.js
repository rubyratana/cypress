/// <reference types="cypress" />

context("First page button check", () => {
  beforeEach(() => {
    cy.visit("https://cycle.dia-sandbox.govt.nz/");
  });

  it("choose 1 person", () => {
    cy.contains("a", "1").click(); // Click on button
  });

  it("choose 2 people", () => {
    cy.contains("a", "2").click(); // Click on button
  });

  it("choose 3 peopl", () => {
    cy.contains("a", "3").click(); // Click on button
  });

  it("choose 4 people", () => {
    cy.contains("a", "4").click(); // Click on button
  });

  it("choose 5+ people", () => {
    cy.contains("a", "5+").click(); // Click on button
  });
});
