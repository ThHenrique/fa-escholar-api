'use strict'

const User = use('App/Models/User')
const Admin = use('App/Models/Admin')
const Database = use('Database')
const Role = use('Role')

class AdminsController {
  async index({ request, response, auth }) {
    try {
      const admins = await Admin.query()
        .fetch()

      return response.status(200).send(admins)
    }
    catch (err) {
      console.log(err);
    }
  }

  async update({ params, request, response }) {
    try {
      const admin = await Admin.findOrFail(params.id)
      const data = request.all()
      admin.merge(data)
      await admin.save()
      return response.status(200).send(admin)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async show({ params, response }) {
    try {
      const admin = await Admin.findOrFail(params.id)

      return response.status(200).send(admin)
    } catch (error) {
      console.log(error);
    }
  }

  async destroy({ params, response }) {
    try {
      const admin = await Admin.findOrFail(params.id)
      await admin.delete()
      return response.status(200).send()
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

module.exports = AdminsController

