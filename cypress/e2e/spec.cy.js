describe('Home page', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Open to do page and verify title', () => {
    cy.get("#app > h1").should("contain", "To-Do List");
  })

  it('Verify label of completed todo', () => {
    cy.get("#todo-"+1).check();
    cy.get("#list-summary").should("contain", "3 out of 4 items completed");
  })

  it('Edit description of todo', () => {
    cy.get(`#app > ul > li:nth-child(1) > div > div.btn-group > button:nth-child(1)`).click();
    cy.get(`#todo-1`).clear({ force: true }).type("Start Cypress", { force: true });
    cy.get(`#app > ul > li:nth-child(1) > form > div.btn-group > button.btn.btn__primary`).click();
    cy.get(`#app > ul > li:nth-child(1) > div > div.custom-checkbox > label`).should("contain", "Start Cypress");
  })
});