### Table of Contents
1. [[#Changelog]]
2. [[#Authentication]]
3. [[#User]]
4. [[#Chat]]
5. [[#Message]]
6. [[#Glossary]]

### Changelog

| Version | Date       | Author | Description   |
| ------- | ---------- | ------ | ------------- |
| 1.0     | 09-11-2024 | baolhq | Initial draft |
### Authentication 
##### Login
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

##### Register
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

##### Reset password
Sent password restoration code to user

**Request**

| Method | URL                     |
| ------ | ----------------------- |
| GET    | api/auth/reset-password |

| Type | Param | Value  |
| ---- | ----- | ------ |
| GET  | email | string |


**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    |                                       |
| 400    | {"error": "Please provide \<param>."} |
| 401    | {"error": "Incorrect email."}         |

##### Confirm reset password
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

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    |                                       |
| 400    | {"error": "Please provide \<param>."} |
| 401    | {"error": "Incorrect email."}         |

##### Change password
Update password after OTP check was successful

**Request**

| Method | URL                     |
| ------ | ----------------------- |
| PUT    | api/auth/reset-password |

| Type | Param    | Value  |
| ---- | -------- | ------ |
| PUT  | email    | string |
| PUT  | password | string |
**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 204    |                                                           |
| 400    | {"error": "Please provide \<param>."}                     |
| 400    | {"error": "Email not exists."}                            |

### User
##### List \[ADMIN]
List all user accounts

**Request**

| Method | URL       |
| ------ | --------- |
| GET    | api/users |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| HEAD | auth_token | string |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    | {<br>    "data": Array\<User><br>}    |
| 400    | {"error": "Please provide \<param>."} |
| 400    | {"error": "Email not exists."}        |
| 403    | {"error": "Access denied."}           |

##### Create \[ADMIN]
Create user account

**Request**

| Type | Param         | Value  |
| ---- | ------------- | ------ |
| POST | first_name    | string |
| POST | last_name     | string |
| POST | email         | string |
| POST | date_of_birth | date   |
| POST | auth_token    | string |

| Status | Response                              |
| ------ | ------------------------------------- |
| 201    | {<br>    "user_id": string<br>}       |
| 400    | {"error": "Please provide \<param>."} |
| 403    | {"error": "Access denied."}           |

##### Read \[AUTHORIZED]
Get user data

**Request**

| Method | URL                |
| ------ | ------------------ |
| GET    | api/user/{user_id} |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| HEAD | auth_token | string |
| GET  | user_id    | string |

**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    | {<br>    "data": string<br>}          |
| 400    | {"error": "Please provide \<param>."} |
| 401    | {"error": "Access denied."}           |

##### Update \[AUTHORIZED]
Update user account

**Request**

| Method | URL      |
| ------ | -------- |
| PUT    | api/user |

| Type | Param             | Value                    |
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
| PUT  | prefererred_theme | string (default="light") |
**Response**

| Status | Response                                                  |
| ------ | --------------------------------------------------------- |
| 200    |                                                           |
| 400    | {"error": "Please provide \<param>."}                     |
| 401    | {"error": "Access denied."}                               |

##### Delete \[AUTHORIZED]
Set user account isActive to false

**Request**

| Method | URL      |
| ------ | -------- |
| DELETE | api/user |

| Type   | Param      | Value  |
| ------ | ---------- | ------ |
| DELETE | id         | string |
| DELETE | auth_token | string |

**Response**

| Status | Response                                               |
| ------ | ------------------------------------------------------ |
| 204    |                                                        |
| 400    | {"error": "Please provide \<param>."}                  |
| 401    | {"error": "Access denied."}                            |

### Chat
##### List \[AUTHORIZED]
List all user chat history

**Request**

| Method | URL      |
| ------ | -------- |
| GET    | api/chat |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| HEAD | auth_token | string |

**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    | {<br>    "data": Array\<Chat><br>}    |
| 400    | {"error": "Please provide \<param>."} |

##### Message \[AUTHORIZED]
List user chat messages

**Request**

| Method | URL                |
| ------ | ------------------ |
| GET    | api/chat/{chat_id} |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| HEAD | auth_token | string |
| GET  | chat_id    | string |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    | {<br>    "data": Array\<Message><br>} |
| 400    | {"error": "Please provide \<param>."} |
##### Update \[AUTHORIZED]
Update chat name, members

**Request**

| Method | URL      |
| ------ | -------- |
| PUT    | api/chat |

| Type | Param      | Value                                            |
| ---- | ---------- | ------------------------------------------------ |
| HEAD | auth_token | string                                           |
| PUT  | chat_id    | string                                           |
| PUT  | name       | string                                           |
| PUT  | member     | string (from array of user_id, seperated by ";") |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 204    |                                       |
| 400    | {"error": "Please provide \<param>."} |

##### Delete \[AUTHORIZED]
Set chat isActive to false

**Request**

| Method | URL      |
| ------ | -------- |
| DELETE | api/chat |

| Type   | Param      | Value  |
| ------ | ---------- | ------ |
| HEAD   | auth_token | string |
| DELETE | chat_id    | string |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 204    |                                       |
| 400    | {"error": "Please provide \<param>."} |
| 401    | {"error": "Access denied."}           |
### Message
##### List \[AUTHORIZED]
Get all messages within a chat

**Request**

| Method | URL         |
| ------ | ----------- |
| GET    | api/message |

| Type | Param      | Value  |
| ---- | ---------- | ------ |
| HEAD | auth_token | string |
| GET  | chat_id    | string |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 200    | {<br>    "data": Array\<Message><br>} |
| 400    | {"error": "Please provide \<param>."} |
##### Create \[AUTHORIZED]
Create message within a chat

**Request**

| Method | URL         |
| ------ | ----------- |
| POST   | api/message |

| Type | Param      | Value   |
| ---- | ---------- | ------- |
| HEAD | auth_token | string  |
| POST | chat_id    | string  |
| POST | author     | string  |
| POST | content    | string  |
| POST | isMedia    | boolean |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 201    |                                       |
| 400    | {"error": "Please provide \<param>."} |
##### Update \[AUTHORIZED]
Update message content, media or reactions

**Request**

| Method | URL         |
| ------ | ----------- |
| PUT    | api/message |

| Type | Param           | Value                                                 |
| ---- | --------------- | ----------------------------------------------------- |
| HEAD | auth_token      | string                                                |
| PUT  | chat_id         | string                                                |
| PUT  | content         | string                                                |
| PUT  | isMedia         | boolean                                               |
| PUT  | reactions_count | string (e.g "10020" is laughing=1, angry=0, sad=0,..) |
**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 204    |                                       |
| 400    | {"error": "Please provide \<param>."} |
##### Delete \[AUTHORIZED]
Delete message entirely

**Request**

| Method | URL         |
| ------ | ----------- |
| DELETE | api/message |

| Type   | Param           | Value                                                 |
| ------ | --------------- | ----------------------------------------------------- |
| HEAD   | auth_token      | string                                                |
| DELETE | chat_id         | string                                                |
| DELETE | message_id      | string                                                |

**Response**

| Status | Response                              |
| ------ | ------------------------------------- |
| 204    |                                       |
| 400    | {"error": "Please provide \<param>."} |
### Glossary

#### Conventions

- Client - Client application.
- Status - HTTP status code of response.
- All the possible responses are listed under ‘Responses’ for each method. Only one of them is issued per request server.
- All response are in JSON format.
- All request parameters are mandatory unless explicitly marked as \[optional]
The type of values accepted for a request parameter are shown the the values column like this \[10|\<any number>] .The | symbol means OR. If the parameter is \[optional], the default value is shown in blue bold text, as 10 is written in \[10|\<any number>].

**

#### Status Codes

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
