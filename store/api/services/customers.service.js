const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);         //hash de la pasword
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }

    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;         //para no retornar al cliente el password - importante

    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('cliente no encontrado');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);        //ya no se reutiliza la validación si no hay customer
    const rta = await customer.update(changes);

    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
