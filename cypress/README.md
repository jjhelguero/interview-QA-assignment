# API testing with Cypress

Cypress tests are in the automationTests/cypress/integration/ directory. I used [Cypress](https://www.cypress.io) for automation tests.

In order to prep, run the following command to install all dependencies

```
cd cypress
npm install
```


You can also launch Cypress on your local machine and run it in headed mode with a nice GUI. This is recommended when developing tests or troubleshooting:

```
cd cypress
npm run cy:open
```


for headless testing

```
cd cypress
npm run cy:run
```