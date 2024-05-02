const jwt = require('jsonwebtoken');

const secret = 'myCat';  //Esta clave debería estar en una variable de entorno y no en codigo
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
