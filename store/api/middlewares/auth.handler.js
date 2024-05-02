const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey ){
    next();
  }else{
    next(boom.unauthorized());
  }
}

//1ra forma pero se codifica mucho
function checkAdminRole(req, res, next){
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

//2da forma, es mas dinamico, mucho mejor
function checkRoles(...roles){
  return (req, res, next) => {
    console.log(req.user);
    const user = req.user;
    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
