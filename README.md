USERS

        SIGNUP

        POST URL:3000/api/users/signup

        Content-Type: application/json

        body
        {
        "name": "name", //optional
        "email": "test@test.com",
        "password" : "password"
        }

        ---

        LOGIN

        POST URL:3000/api/users/login

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
        POST URL:3000/api/users/logout

        Content-Type: application/json

        body
        {}
        Authorization: "Bearer {{token}}"

        ---

        RESEND VERIFICATION EMAIL

        Content-Type: application/json

        POST URL:3000/api/users/verify
        body
        {
        "email": "lewyk@hotmail.com"
        }

        ---

        CHANGE AVATAR

        POST URL:3000/api/users/avatars

        Content-Type: multipart/form-data
        Authorization: "Bearer {{token}}"

        ---

CONTACTS

        ADD CONTACT

        POST URL:3000/api/contacts

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

        GET URL:3000/api/contacts

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        DELETE CONTACT

        DELETE URL:3000/api/contacts/:ID

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        GET CONTACT BY ID

        GET URL:3000/api/contacts/:ID

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {}

        ---

        UPDATE CONTACT

        PUTCH URL:3000/api/contacts/:ID

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

        PUTCH URL:3000/api/contacts/:ID/favorite

        Content-Type: application/json
        Authorization: "Bearer {{token}}"

        body
        {
        "favorite": true/false
        }

        ---
