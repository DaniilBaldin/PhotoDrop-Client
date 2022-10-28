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
