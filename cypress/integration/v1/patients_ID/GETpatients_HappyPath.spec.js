import {
    validateEndpointConnection200StatusCode,
    validateSchemaViaSpok,
    validPatientsIDURL
} from "../../../support";

describe('Happy Path', function () {
    //authenticate before each test
    beforeEach(()=> {
        cy.authenticates(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('should return 200 status code', function () {
        cy.request({
            method: 'GET',
            url: validPatientsIDURL,
        })
            .should(response => {
                expect(response.body.length).to.be.greaterThan(-1)
            })
            .then(response => {
                validateEndpointConnection200StatusCode(response)
            })
    });

    it('should validate response schema', function () {
        //use spoke for schema validation
        cy.request({
            method: 'GET',
            url: validPatientsIDURL,
        })
            .should(() => {
                validateSchemaViaSpok()
            })
    });
});