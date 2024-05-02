
const UserService = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const nodemailer = require('nodemailer');

const service = new UserService();

class AuthService {

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;   //Para no retornar la clave al cliente por buena practica
    return user;                 //Si pasa todas las validaciones pasamos null(no err) y el done user
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token
    };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    //Generación de token
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    //Guardar ern la DB el tocken
    await service.update(user.id, { recoveryToken: token });

    const mail ={
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recuperación de contraseña SHOP', // Subject line
      text: 'Email para recuperación de contraseña TP', // plain text body
      html: `<b>Ingresa a este link -> ${link} </b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
          user: config.smtpEmail,
          pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);
    return { message: 'Email enviado' };
  }
}

module.exports = AuthService;
