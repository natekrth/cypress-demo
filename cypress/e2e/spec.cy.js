describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");          // BELL
  });

  it("Open to do page and verify title", () => {  // BELL
    cy.get("#app > h1").should("contain", "To-Do List");  
  });

  it("Verify label of completed todo", () => {    // BELL
    cy.get("#todo-1").check();
    cy.get("#list-summary").should("contain", "3 out of 4 items completed");
  });

  it("Edit description of todo", () => {    // REW
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

  it("Delete item in todo list", () => {   // REW
    cy.get(
      `#app > ul > li:nth-child(4) > div > div.btn-group > button.btn.btn__danger`
    ).click();
    cy.get("#list-summary").should("contain", "2 out of 3 items completed");
  });

  it("Add item in todo list", () => {   // NATE
    cy.get(`#new-todo-input`).type("Write more testcases", { force: true });
    cy.get(`#app > form > button`).click();
    cy.get("#list-summary").should("contain", "2 out of 5 items completed");
  });
});

describe("API Tests", () => { 
  context("GET /fruit", () => {     // BREEZE
    it("get all fruit", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3000/api/fruit",
      }).then((response) => {
        // Assertions
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.above(1);
        expect(response.body[0]).to.have.property("name");
        expect(response.body[0]).to.have.property("price");
        expect(response.body[0]).to.have.property("rating");
      });
    });
  });

  context("POST", () => {     // BREEZE
    it("add fruit", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/fruit/add",
        qs: {
          name: "cheery",
          price: 5,
          rating: 4.5
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length(3);
      });
    });
    
    it("missing parameter", () => {    // BREEZE
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/fruit/add",
        failOnStatusCode: false,
        qs: {
          name: "cheery",
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });


  context("DELETE", () => {       // NATE
    it("delete fruit with wrong parameter name", () => {
      cy.request({
        method: "DELETE",
        url: "http://localhost:3000/api/fruit/delete",
        qs: {
          names: "cheery",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it("delete fruit", () => {     // NATE
      cy.request({
        method: "DELETE",
        url: "http://localhost:3000/api/fruit/delete",
        qs: {
          deletename: "cheery",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length(2);
      });
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
