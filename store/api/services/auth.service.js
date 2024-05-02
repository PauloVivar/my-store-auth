
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

  async sendMail(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
          user: 'hackconda9@ymail.com',
          pass: 'scwtofqnemqcyfuu'
      }
    });

    await transporter.sendMail({
      from: 'hackconda9@ymail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hola Amigo✔', // Subject line
      text: 'Hola Mundo de ymail?', // plain text body
      html: '<b>Que tal amigo, es mi n mail enviado</b>', // html body
    });
    return { message: 'Email enviado' };
  }
}

module.exports = AuthService;
