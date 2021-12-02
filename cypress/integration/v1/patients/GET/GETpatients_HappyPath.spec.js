import {validateEndpointConnection200StatusCode, validateSchemaViaSpok} from "../../../../support";
describe('Happy Path', function () {
    //authenticate before each test
    beforeEach(()=> {
        cy.authenticates(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('should return 200 status code', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('patients_endpoint'),
        })
            .then(response => {
                validateEndpointConnection200StatusCode(response)
            })
    });

    it('should validate response schema', function () {
        //use spoke for schema validation
        cy.request({
            method: 'GET',
            url: Cypress.env('patients_endpoint'),
        })
            .its('body.data[0]')
            .should(() => {
                validateSchemaViaSpok()
            })
    });
});