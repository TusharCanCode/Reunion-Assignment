# Files required
## `.env`
Create a .env file with the following Data:
MONGO_URL = "Mongo URI"
ACCESS_TOKEN = "Secret Key to sign JWT"

## `collection named users`
Create a collection named 'users' inside database containing users dummy data of the format:
{
    _id: Object ID of an user,
    userName: Name of the user,
    email: email ID of the user,
    password: password set by the user
}

# Available script
## `npm start`
Runs the backend server at port 5000 if not in production mode.

# Dummy data examples
### { _id: ObjectId("6284f22558f0050c50713f49"), userName:"Tushar Bharti", email:"tbharti2001@gmail.com", password:"Test@2021" }
### { _id: ObjectId("6284f33058f0050c50713f4a"), userName:"Sparsh Gupta", email:"sparsh@gmail.com", password:"Test@2021" }