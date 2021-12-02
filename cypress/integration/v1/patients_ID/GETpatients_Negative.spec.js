import {
    validateUnsupportedMethodsForGetEndpoint,
    validateForbiddenUserAttemptsRequest,
    validateUnauthorizedUserAttemptsRequest,
    validPatientsIDURL,
    notFoundRequestStatusCode,
    methodGET, validateInvalidPaylaod
} from "../../../support";


describe('Bad requests', function () {
    beforeEach(()=> {
        cy.authenticate(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })
    it('ID not provided should return 400 status code', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('patientByID_endpoint'),
        })
            .then(response => {
                validateInvalidPaylaod(response)
            })

    });

    it('Malformed ID should return 400 status code', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('patientByID_endpoint') + '@#$',
        })
            .then(response => {
                validateInvalidPaylaod(response)
            })

    });
});

validateUnauthorizedUserAttemptsRequest(Cypress.env('unauth_username'), Cypress.env('unauth_password'), methodGET, validPatientsIDURL)
validateForbiddenUserAttemptsRequest(Cypress.env('forbidden_username'),Cypress.env('forbidden_password'), methodGET, validPatientsIDURL)
validateUnsupportedMethodsForGetEndpoint(Cypress.env('auth_username'),Cypress.env('auth_password'), methodGET, validPatientsIDURL)

describe('Not Found', function () {
    beforeEach(()=> {
        cy.authenticate(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('Non-existent ID should return 404 status code', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('patientByID_endpoint') + 999999999,
        })
            .then(response => {
                cy.wrap(response.status,{log:false}).should('match',notFoundRequestStatusCode)
                cy.wrap(response.statusText,{log:false}).should('eq',badRequestStatusCodeStatusText)
                cy.wrap(response.isOkStatusCode,{log:false}).should('eq',isNotOkStatusCodeBool)
            })

    });
});