const jwt = require('jsonwebtoken');

const secret = 'myCat';                //Esta clave debería estar en una variable de entorno y no en codigo
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxMzc0NTQ4MX0.LtFtxxWHrxg6iPXDHkiSUDfmyImFWz8j4HgNbfyH2kA';

function verifyToken(token, secret){
  return jwt.verify(token, secret)

}

const payload = verifyToken(token, secret);
console.log(payload);
