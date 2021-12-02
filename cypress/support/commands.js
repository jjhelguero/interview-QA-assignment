// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/*
    Cypress custom command assumes authentication with url "/api/v1/authn"
    and only requires user to send username, password
 */
Cypress.Commands.add('authenticate', (username, password) =>
    cy.request({
        method: 'POST',
        url: `/api/v1/authn`,
        body:{
            //Log in with auth creds
            username: Cypress.env(username),
            password: Cypress.env(password),
        }
    })
)