'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Client = use('App/Models/Client')
const Role = use('Role')
const Mail = use('Mail')
const Env = use('Env')

class AuthController {
  async signIn({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.withRefreshToken().attempt(email, password)
      return response.status(200).send(token)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send({
        message: 'E-mail ou Senha incorretos'
      })
    }
  }

  async signUp({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const { email, password, ...data } = request.all()
      const user = await User.create({ email, password }, trx)
      const userRole = await Role.findBy('slug', 'default')
      await user.roles().attach([userRole.id], null, trx)
      await user.client().create(data, trx)

      await trx.commit()

      const token = await auth.withRefreshToken().attempt(email, password)

      await Mail.send('welcome_escholar', user.toJSON(), (message) => {
        message
          .to(email)
          .from(`${Env.get('MAIL_USERNAME')}`)
          .subject('Email de Boas Vindas')
      })

      return response.status(200).send(token)
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async refresh({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    const token = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token)
    return response.status(200).send(token)
  }

  async logout({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    await auth.authenticator('jwt').revokeTokens([refresh_token], true)
    return response.status(200).send()
  }

  async getUser({ response, auth }) {
    try {
      const user = await auth.getUser()
      const client = await user.client().fetch()

      const data = Object.assign(client, { email: user.email })

      return response.status(200).send(data)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async update({ request, response, auth }) {
    try {
      const user = await auth.getUser()
      const client = await Client.query()
        .where('user_id', user.id)
        .first()
      const data = request.all()
      client.merge(data)
      await client.save()

      return response.status(200).json({ success: 'Atualizado com sucesso' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async sendMail({request, response, auth}) {
    try {
      const user = await auth.getUser()
      const client = await user.client().fetch()

      const data = Object.assign(client, { email: user.email })

      await Mail.send('welcome_escholar', data.toJSON(), (message) => {
        message
          .to('henriquethiago298@gmail.com')
          .from(`${Env.get('MAIL_USERNAME')}`)
          .subject('Email de Boas Vindas')
      })

    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async index({ response, auth }) {
    try {
      const clients = await Client.all()

      return response.status(200).send(clients)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }
}

module.exports = AuthController
