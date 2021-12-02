import {
    methodGET,
    validateForbiddenUserAttemptsRequest, validateInvalidPaylaod,
    validateUnauthorizedUserAttemptsRequest,
    validateUnsupportedMethodsForGetEndpoint
} from "../../../../support";

describe('Bad requests', function () {
    beforeEach(()=> {
        cy.authenticate(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('Malformed payload should return 400 status code', function () {
        const invalidPatientPayload = {
            drug_code: '1234-1234',
            first_name: 'fName',
            last_name: 'lName',
            email_address: 'email@email.com'
        }
        cy.request({
            method: 'POST',
            url: Cypress.env('patients_endpoint'),
            body: invalidPatientPayload
        })
            .then(response => {
                validateInvalidPaylaod(response)
            })

    });
});

validateUnauthorizedUserAttemptsRequest(Cypress.env('unauth_username'), Cypress.env('unauth_password'), methodGET,Cypress.env('patients_endpoint'))
validateForbiddenUserAttemptsRequest(Cypress.env('forbidden_username'),Cypress.env('forbidden_password'), methodGET,Cypress.env('patients_endpoint'))
validateUnsupportedMethodsForGetEndpoint(Cypress.env('auth_username'),Cypress.env('auth_password'), methodGET, Cypress.env('patients_endpoint'))

describe('Unprocessable request', function () {
    beforeEach(()=> {
        cy.authenticate(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('Malformed payload should return 400 status code', function () {
        const invalidPatientPayload = {
            first_name: 'fName',
            last_name: 'lName'
        }
        cy.request({
            method: 'POST',
            url: Cypress.env('patients_endpoint'),
            body: invalidPatientPayload
        })
            .then(response => {
                cy.wrap(response.status,{log:false}).should('match',422)
                cy.wrap(response.statusText,{log:false}).should('eq','Unprocessable Entity')
                cy.wrap(response.isOkStatusCode,{log:false}).should('eq',false)
            })

    });
});