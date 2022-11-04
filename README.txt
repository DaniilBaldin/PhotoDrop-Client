# PhotoDrop-Client

Client side of service for exchange photos between photographer and client, based on AWS S3 service.

// method: POST - https://photodrop-app-client.herokuapp.com/login - Sends verification message.
{
"phone_number": "*enter valid number here*"
}

// method: POST - https://photodrop-app-client.herokuapp.com/verify - Validate user, check if user exists in database, and, if not, adds it to database. Returns JWT token for valid code or error for not valid code.
{
"phone_number": "*enter valid number here*",
"code": "*enter code from sms here*"
}

// method: POST - https://photodrop-app-client.herokuapp.com/selfie - Sets users selfie image and uploads to AWS S3. User must be authorized.

// method: POST - https://photodrop-app-client.herokuapp.com/name - Change users name. User must be authorized. Req body:
{
    "client_name": "Daniel"
}


// method: GET - https://photodrop-app-client.herokuapp.com/client - Gets user data(Name, selfie image, phone number). User must be authorized.


                            PHOTO

// method: GET - https://photodrop-app-client.herokuapp.com/photos - Gets all users photo from database. User must be authorized.

                            ALBUMS

// method: GET - https://photodrop-app-client.herokuapp.com/albums - Gets all users albums from database. User must be authorized.

// method: GET - https://photodrop-app-client.herokuapp.com/album/:id - Gets album info and all photos with user by id from database. Id in request params. User must be authorized.