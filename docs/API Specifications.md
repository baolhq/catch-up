
| Version | Date       | Author | Description   |
| ------- | ---------- | ------ | ------------- |
| 1.0     | 09-11-2024 | baolhq | Initial draft |
# Authentication 
### Login
Authenticate the user with the system and obtain the auth_token

**Request**

| Method | URL            |
| ------ | -------------- |
| POST   | api/auth/login |

| Type | Param    | Value  |
| ---- | -------- | ------ |
| POST | email    | string |
| POST | password | string |

**api_key must be sent with all client requests. The api_key helps the server to validate the request source.**

**Response**

| Status | Response                                                   |
| ------ | ---------------------------------------------------------- |
| 200    | {<br>    "auth_token": string<br>}                         |
| 403    | {"error": "API key is missing."}                           |
| 400    | {"error": "Please provide \<param>."}                      |
| 401    | {"error": "Invalid API key."}                              |
| 401    | {"error": "Incorrect email or password."}                  |
| 500    | {"error": "Something went wrong. Please try again later."} |

### Register
Register the user with the system and obtain the auth_token

**Request**

| Method | URL               |
| ------ | ----------------- |
| POST   | api/auth/register |

| Type | Param    | Value  |
| ---- | -------- | ------ |
| POST | email    | string |
| POST | password | string |
**api_key must be sent with all client requests. The api_key helps the server to validate the request source.**

**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    | {<br>    "auth_token": string<br>}                        |
| 403    | {"error": "API key is missing."}                          |
| 400    | {"error": "Please provide email."}                        |
| 400    | {"error": "Please provide password."}                     |
| 401    | {"error": "Invalid API key."}                             |
| 401    | {"error": "Incorrect email or password."}                 |
| 500    | {"error": "Something went wrong. Please try again later." |
### Reset password
Sent password restoration code to user

**Request**

| Method | URL                     |
| ------ | ----------------------- |
| GET    | api/auth/reset-password |

| Type | Param | Value  |
| ---- | ----- | ------ |
| GET  | email | string |


**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    |                                                           |
| 400    | {"error": "Please provide email."}                        |
| 401    | {"error": "Incorrect email."}                             |
| 500    | {"error": "Something went wrong. Please try again later." |

### Confirm reset password
Submit  OTP code to confirm

**Request**

| Method | URL                     |
| ------ | ----------------------- |
| POST   | api/auth/reset-password |

| Type | Param | Value  |
| ---- | ----- | ------ |
| POST | otp   | string |
| POST | email | string |
**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    |                                                           |
| 400    | {"error": "Please provide email."}                        |
| 401    | {"error": "Incorrect email."}                             |
| 500    | {"error": "Something went wrong. Please try again later." |
### Change password
Update password after OTP check was successful

**Request**

| Method | URL                     |
| ------ | ----------------------- |
| PUT    | api/auth/reset-password |



| Type | Par    m | Value  | ---- | -------- | ------ | | PUT  T email      | string | PUT  T password l | string **Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 204    |                                                           |
| 400    | {"error": "Please provide \<param>."}                     |
| 400    | {"error": "Email not exists."}                            |
| 500    | {"error": "Something went wrong. Please try again later." ||

# Us
### List \[ADMIN]
List all user accounts

**Request**

| Method | URL       |
| ------ | --------- |
| POST   | api/users |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| POST | auth_token | string |
**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    | {<br>    "data": <br>}                                    |
| 400    | {"error": "Please provide \<param>."}                     |
| 400    | {"error": "Email not exists."}                            |
| 500    | {"error": "Something went wrong. Please try again later." |

#### Create [ADMIN]
C
Create user account

**Request**

| Method | URL           |        |      |       |       |
| ------ | ------------- | ------ | ---- | ----- | ----- |
| POST   | api/user      |        | Type | Param | Value |
| POST   | first_name    | string |      |       |       |
| POST   | last_name     | string |      |       |       |
| POST   | email         | string |      |       |       |
| POST   | date_of_birth | date   |      |       |       |
| POST   | auth_token    | string |      |       |       |
**Response**| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 201    | {<br>    "user_id": string<br>}                           |
| 400    | {"error": "Please provide \<param>."}                     |
| 401    | {"error": "Access denied."}                               |
| 500    | {"error": "Something went wrong. Please try again later." | |

### Read [AUTHORIZED]
Get user data

**Request**

| Method | URL           |
| ------ | ------------- | POST     | api/user/{id} || Type | Param      | Value  |
| ---- | ---------- | ------ |
| POST | id         | string |
| POST | auth_token | string | |

**Response**| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    | {<br>    "data": string<br>}                              |
| 400    | {"error": "Please provide id."}                           |
| 401    | {"error": "Access denied."}                               |
| 500    | {"error": "Something went wrong. Please try again later." | |
### Upda \[AUTHORIZED]te
Update user account

**Request**

| Method | URL      |
| ------ | -------- |
| PUT    | api/user || Type | Param             | Value                    |
| ---- | ----------------- | ------------------------ |
| PUT  | id                | string                   |
| PUT  | auth_token        | string                   |
| PUT  | first_name        | string                   |
| PUT  | last_name         | string                   |
| PUT  | email             | string                   |
| PUT  | date_of_birth     | date                     |
| PUT  | avatar_url        | string                   |
| PUT  | address           | string                   |
| PUT  | bio               | string                   |
| PUT  | phone             | string                   |
| PUT  | prefererred_theme | string (default="light") | |
**Response**| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    |                                                           |
| 400    | {"error": "Please provide \<param>."}                     |
| 401    | {"error": "Access denied."}                               |
| 500    | {"error": "Something went wrong. Please try again later." | |
### Dele \[AUTHORIZED]teSette user accou isActive to falsent

**Request**

| Method | URL      |
| ------ | -------- |
| DELETE | api/user || Type   | Param      | Value  |
| ------ | ---------- | ------ |
| DELETE | id         | string |
| DELETE | auth_token | string | |

**Response**| Status | Response                                               |
| ------ | ------------------------------------------------------ |
| 204    |                                                        |
| 400    | {"error": "Please provide \<param>."}                  |
| 401    | {"error": "Access denied."}                            |
| 500    | {"error": "Something went wrong. Please try again late | 

# Chat

|

# Glossary

## Conventions

- Client - Client application.
- Status - HTTP status code of response.
- All the possible responses are listed under ‘Responses’ for each method. Only one of them is issued per request server.
- All response are in JSON format.
- All request parameters are mandatory unless explicitly marked as \[optional]
The type of values accepted for a request parameter are shown the the values column like this \[10|\<any number>] .The | symbol means OR. If the parameter is \[optional], the default value is shown in blue bold text, as 10 is written in \[10|\<any number>].

**

## Status Codes

All status codes are standard HTTP status codes. The below ones are used in this API.

2XX - Success of some kind
4XX - Error occurred in client’s part
5XX - Error occurred in server’s part

| Status Code | Description                                           |
| ----------- | ----------------------------------------------------- |
| 200         | OK                                                    |
| 201         | Created                                               |
| 202         | Accepted (Request accepted, and queued for execution) |
| 400         | Bad request                                           |
| 401         | Authentication failure                                |
| 403         | Forbidden                                             |
| 404         | Resource not found                                    |
| 405         | Method Not Allowed                                    |
| 409         | Conflict                                              |
| 412         | Precondition Failed                                   |
| 413         | Request Entity Too Large                              |
| 500         | Internal Server Error                                 |
| 501         | Not Implemented                                       |
| 503         | Service Unavailable                                   |
