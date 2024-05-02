const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);   //hash de la pasword
    const newUser = await models.User.create({
      ...data,
      password : hash
    });
    delete newUser.dataValues.password;   //para no retornar al cliente el password - importante!!!
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findByEmail(email) {                          //Metodo para autentificar lib passport
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);    //ya no se reutiliza la validación si no hay user
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
