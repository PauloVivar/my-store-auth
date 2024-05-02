const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const token = Joi.string();
const newPassword = Joi.string().min(8);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

//Auth
const updateAuthEmailSchema = Joi.object({
  email: email.required(),
});

const updateAuthPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, updateAuthPasswordSchema, updateAuthEmailSchema }
