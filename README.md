# uni_rest-api


Visos uzklausos vykdomos is: localhost/api/users

GET: {
  localhost/api/users,
  localhost/api/users/:id
},
POST: {
  localhost/api/users
}
PATCH: {
  localhost/api/users/:id
},
PUT: {
  localhost/api/users/:id
}
DELETE: {
  localhost/api/users/:id
}


## commands to start the rest-api: 
docker build -t rest-api .  
docker run -p 80:3000 rest-api -d
