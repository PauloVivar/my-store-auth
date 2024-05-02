
const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = '123';
  const hash = '$2b$10$CtVIO6f7Dh6EVqxk4IROje6Dg8Cd5h1MHV6OKifXB7qjq48MZeuxG'
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);

}

verifyPassword();
