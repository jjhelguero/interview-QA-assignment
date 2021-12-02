import {validateSchemaViaSpok} from "../../../../support";

const {validateEndpointConnection200StatusCode} = require("../../../../support");

const validPatientPayload = {
    first_name: 'fName',
    last_name: 'lName',
    email_address: 'email@email.com',
    drug_code: '1234-1234'
}
describe('Create a patient', function () {
    beforeEach(()=> {
        cy.authenticates(Cypress.env('auth_username'),Cypress.env('auth_password'))
    })

    it('Creating a patient should return 200 status code', function () {
        cy.request({
            method: 'POST',
            url: Cypress.env('patients_endpoint'),
            body: validPatientPayload
        })
            .then(response=> {
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