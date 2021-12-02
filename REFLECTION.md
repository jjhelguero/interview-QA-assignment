# What I would do different
First, I would write the API tests in Postman as it would be easier to maintain and develop in
the future. I was not comfortable enough to use Postman with this exercise and thus using
Cypress.io

Secondly, questions I would clarify with the business/development** team
1. What is the acceptance criteria for each API? This will further refrain tests and determine the
   expectations of the APIs, such as payload formate requirements, request headers, etc.
2. Do the APIs have any dependencies? This will help create tests simulating end-user/business flow
3. What is the expected response time for each API response?
4. What are the security expectations, such as rate limit, keys, tokens, etc?
5. What is the expected system load for the APIs?


Third, if given more time, I would add destructive test scenarios POST /patients to validate payload
does not accept other primitive values nor objects other than what is stated in the docs. Add 
security test scenarios for rate limits, keys, tokens, etc. Add performance tests for load, stress, 
endurance, and spike testing.