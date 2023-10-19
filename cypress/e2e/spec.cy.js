describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Open to do page and verify title", () => {
    cy.get("#app > h1").should("contain", "To-Do List");
  });

  it("Verify label of completed todo", () => {
    cy.get("#todo-1").check();
    cy.get("#list-summary").should("contain", "3 out of 4 items completed");
  });

  it("Edit description of todo", () => {
    cy.get(
      `#app > ul > li:nth-child(1) > div > div.btn-group > button:nth-child(1)`
    ).click();
    cy.get(`#todo-1`)
      .clear({ force: true })
      .type("Start Cypress", { force: true });
    cy.get(
      `#app > ul > li:nth-child(1) > form > div.btn-group > button.btn.btn__primary`
    ).click();
    cy.get(
      `#app > ul > li:nth-child(1) > div > div.custom-checkbox > label`
    ).should("contain", "Start Cypress");
  });

  it("Delete item in todo list", () => {
    cy.get(
      `#app > ul > li:nth-child(4) > div > div.btn-group > button.btn.btn__danger`
    ).click();
    cy.get("#list-summary").should("contain", "2 out of 3 items completed");
  });

  it("Add item in todo list", () => {
    cy.get(`#new-todo-input`).type("Write more testcases", { force: true });
    cy.get(`#app > form > button`).click();
    cy.get("#list-summary").should("contain", "2 out of 5 items completed");
  });
});

describe("API Tests", () => {
  it("should retrieve a list of projects", () => {
    cy.request({
      method: "GET",
      url: "http://localhost/project",
    }).then((response) => {
      // Assertions
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length.above(1);
      expect(response.body[0]).to.have.property("name");
      expect(response.body[0]).to.have.property("description");
    });
  });
});

// describe("API Testss", () => {
//   it("one project", () => {
//     cy.request({
//       method: "GET",
//       url: "http://localhost/project/Memomood",
//     }).then((response) => {
//       expect(response.status).to.equal(200);
//       expect(response.body).to.have.length.above(1);
//     });
//   });
// });
