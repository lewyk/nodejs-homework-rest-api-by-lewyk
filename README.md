URL = https://contacts-by-lewyk.herokuapp.com

SERS

        SIGNUP

        POST URL/api/users/signup

        Content-Type: application/json

        body
        {
        "name": "name", //optional
        "email": "test@test.com",
        "password" : "password"
        }

        ---

        LOGIN

        POST URL/api/users/login

        Content-Type: application/json

        body
        {
        "email": "test@test.com",
        "password" : "qwe"
        }

        ---

        CURRENT

        GET URL:api/users/current

        Content-Type: application/json

        body
        {}
        Authorization: "Bearer {{token}}"

        ---

        LOGOUT
        POST URL/api/users/logout

        Content-Type: application/json

        body
        {}
        Authorization: "Bearer {{token}}"

        ---

        RESEND VERIFICATION EMAIL

        Content-Type: application/json

        POST URL/api/users/verify
        body
        {
        "email": "lewyk@hotmail.com"
        }

        ---

        CHANGE AVATAR

        POST URL/api/users/avatars

        Content-Type: multipart/form-data
        Authorization: "Bearer {{token}}"

        ---

CONTACTS

        ADD CONTACT

        POST URL/api/contacts

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {
        "name":"name",
        "email": "test@test.com",
        "phone":"+380931234567",
        "favorite": true/false
        }

        ---

        GET ALL CONTACTS

        GET URL/api/contacts

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        DELETE CONTACT

        DELETE URL/api/contacts/:ID

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        GET CONTACT BY ID

        GET URL/api/contacts/:ID

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        UPDATE CONTACT

        PUTCH URL/api/contacts/:ID

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {
        "name":"name",
        "email": "test@test.com",
        "phone":"+380931234567",
        "favorite": true/false
        }

        ---

        UPDATE FAVORITE

        PUTCH URL/api/contacts/:ID/favorite

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {
        "favorite": true/false
        }

        ---
