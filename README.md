# Cypress demo step

## Start new Cypress project
- Make your new project folder
    ```
    mkdir your-cypress-project
    ```

- Change directory
    ```
    cd/your-cypress-project
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

- In cypress folder, add new folder named ```e2e``` and add new file name ```spec.cy.js```