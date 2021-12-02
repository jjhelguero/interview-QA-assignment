// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import spok from "cy-spok";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const successStatusCode = /^(200)|(201)/
const badRequestStatusCode = /400/
const unauthorizedStatusCode = /401/
const forbiddenStatusCode = /403/
const isNotOkStatusCodeBool = false
export const notFoundRequestStatusCode = /401/
export const methodGET = 'GET'

export const validPatientsIDURL = Cypress.env('patientByID_endpoint') + '1'

export const validateEndpointConnection200StatusCode = (res) => {
    //Validates successful connection to endpoint
    cy.log('ENDPOINT CONNECTION')
    cy.wrap(res.status,{log:false}).should('match',successStatusCode)
    cy.wrap(res.statusText,{log:false}).should('eq','OK')
    cy.wrap(res.isOkStatusCode,{log:false}).should('eq',true)
}
export const validateSchemaViaSpok = () => {
    spok({
        $id: spok.number, //optional
        first_name: spok.string,
        last_name: spok.string,
        gender: spok.string,
        phone: spok.string,
        email_address: spok.string,
        visit_date: spok.string,
        diagnosis: spok.string,
        drug_code: spok.string,
    })
}
export const validateInvalidPaylaod = (res) => {
    cy.wrap(res.status,{log:false}).should('match',badRequestStatusCode)
    cy.wrap(res.statusText,{log:false}).should('eq','Bad Request')
    cy.wrap(res.isOkStatusCode,{log:false}).should('eq',isNotOkStatusCodeBool)
}

export const validateUnauthorizedUserAttemptsRequest = (username,password, method, endpoint) => {
    //Unauthorized user attempts GET to /patients
    describe('Unauthorized User attempts request', function () {
        beforeEach(() => {
            cy.authenticate(username,password)
        })

        it('should return 401 status code', function () {
            cy.request({
                method: method,
                url: Cypress.env(endpoint),
            })
                .then(response => {
                    expect(response.status).to.match(unauthorizedStatusCode)
                    expect(response.statusText).to.eq('Unauthorized')
                    expect(response.isOkStatusCode).to.eq(isNotOkStatusCodeBool)
                })
        });
    });
}
export const validateForbiddenUserAttemptsRequest = (username, password, method, endpoint) => {
    //Forbidden user attempts to GET to /patients
    describe('Forbidden user attempts request', function () {
        beforeEach(() => {
            cy.authenticate(username,password)
        })

        it('should return 401 status code', function () {
            cy.request({
                method: 'GET',
                url: Cypress.env(endpoint),
            })
                .then(response => {
                    expect(response.status).to.match(forbiddenStatusCode)
                    expect(response.statusText).to.eq('Forbidden')
                    expect(response.isOkStatusCode).to.eq(isNotOkStatusCodeBool)
                })
        });
    });
}
export const validateUnsupportedMethodsForGetEndpoint = (username, password, method, endpoint) => {
    const methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
    ]
    //Authenticated user attempts unsupported methods to /patients
    describe('Unsupported Methods', function () {
        beforeEach(()=> {
            cy.authenticate(username,password)
        })

        //iterate over all methods not equal to input method
        methods.forEach((element) => {
            if(method !== element){
                it(`${element} should return 401 status code`, function () {
                    cy.request({
                        method: element,
                        url: Cypress.env(endpoint),
                        failOnStatusCode: false
                    })
                        .then(response => {
                            expect(response.status).to.match(unauthorizedStatusCode)
                        })
                });
            }
        })
    });
}
