## Myndshft Patient API


#### Query Patients

`GET /api/v1/patients`

Returns all active patients.

```
200 - OK
401 - Unauthorized
403 - Forbidden

```

_Sample response_

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Rollo",
            "last_name": "Methuen",
            "gender": "Male",
            "phone": "(613) 3063838",
            "email_address": "rmethuen0@jiathis.com",
            "address": "42 Truax Place",
            "visit_date": "2017-12-25",
            "diagnosis": "T17318A",
            "drug_code": "43742-0247"
        },
        {
            "id": 2,
            "first_name": "John",
            "last_name": "Doe",
            "gender": "Male",
            "phone": "(613) 2222222",
            "email_address": "jdoe@nothing.com",
            "address": "123 Any st.",
            "visit_date": "2017-10-10",
            "diagnosis": "T17318A",
            "drug_code": "23333-0247"
        }
    ]
}
```


#### Patient by ID

`GET /api/v1/patients/{id}`

Retrieve a single patient by their ID.

```
200 - OK
400 - Bad Request (when ID not provided or malformed)
401 - Unauthorized
403 - Forbidden
404 - Not Found
```

_Sample Response_

```json
{
    "id": 2,
    "first_name": "John",
    "last_name": "Doe",
    "gender": "Male",
    "phone": "(613) 2222222",
    "email_address": "jdoe@nothing.com",
    "address": "123 Any st.",
    "visit_date": "2017-10-10",
    "diagnosis": "T17318A",
    "drug_code": "23333-0247"
}
```

#### Create a patient

`POST /api/v1/patients`

Creates a patient and generates an auto-incrementing ID.

```
201 - Created
400 - Bad Request (When request body is malformed)
401 - Unauthorized
403 - Forbidden
422 - Unprocessable Entity (Validation of required fields failed)
```

Required Fields:

```
first_name (Alpha-numeric)
last_name (Alpha-numeric)
email_address
drug_code (Alpha-numeric)

```

_Sample Request_

```json
{
    "first_name": "Johnny",
    "last_name": "Newguy",
    "gender": "Male",
    "phone": "(613) 2222222",
    "email_address": "johnny.new.guy@nothing.com",
    "address": "123 Any st.",
    "visit_date": "2017-10-10",
    "diagnosis": "T17318A",
    "drug_code": "23333-0247"
}
```
