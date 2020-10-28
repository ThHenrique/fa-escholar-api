'use strict'

const InvalidAccessException = use('App/Exceptions/InvalidAccessException')

class Admin {

  async handle({ auth }, next) {
    const user = await auth.getUser()
    const role = await user.getRoles()

    if (role == 'default')
      throw new InvalidAccessException(
        'Você não tem permissão de acesso!',
        403,
        'Atenção'
      )

    await next()
  }
}

module.exports = Admin
