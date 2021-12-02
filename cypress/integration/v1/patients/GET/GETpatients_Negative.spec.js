import {
    validateUnsupportedMethodsForGetEndpoint,
    validateForbiddenUserAttemptsRequest,
    validateUnauthorizedUserAttemptsRequest, methodGET
} from "../../../../support";

validateUnauthorizedUserAttemptsRequest(Cypress.env('unauth_username'), Cypress.env('unauth_password'), methodGET, Cypress.env('patients_endpoint'))
validateForbiddenUserAttemptsRequest(Cypress.env('forbidden_username'),Cypress.env('forbidden_password'), methodGET,Cypress.env('patients_endpoint'))
validateUnsupportedMethodsForGetEndpoint(Cypress.env('auth_username'),Cypress.env('auth_password'), methodGET, Cypress.env('patients_endpoint'))