# Cypress demo step

## Start new Cypress project
- Make your new project folder
    ```
    mkdir your-cypress-project
    ```

- Change directory
    ```
    cd your-cypress-project
    ```

- Initialize a project and create the package. json file
    ```
    npm init
    ```

- Install Cypress
    ```
    npm install cypress --save-dev
    ```

## Run Cypress
- Open terminal and run
    ```
    npx cypress open
    ```
    So, the folder cypress will be appear in the folder and will have new file named ```cypress.config.js```

- In ```cypress.config.js``` add
    ```
    const { defineConfig } = require("cypress");
    module.exports = defineConfig({
    e2e: {
        "baseUrl": "http://localhost:8080",
        },
    });
    ```

- In cypress folder,
    - add new folder named ```e2e```
    - add new file name ```spec.cy.js```

## How to write Cypress test

In file ```spec.cy.js```

For example, if we have a scenario like this:
```
Scenario: Open to do page and verify title
    Given open todo page
    Then verify to do title page "To-Do List"
```
- Page: describe
- Scenario: it
- Given: list of item to test

So, we will get
```
describe('Home page', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Open to do page and verify title', () => {
    cy.get("#app > h1").should("contain", "To-Do List");
  })
});
```

## How to get (select) component
 ```
    open inspector in browser
    find component or tag of the component
    copy selector
    paste it in cy.get(.....)
 ```