'use strict'

const InvalidAccessException = use('App/Exceptions/InvalidAccessException')

class User {
  async handle({ auth }, next) {
    const user = await auth.getUser()
    const role = await user.getRoles()

    if (role != 'default') throw new InvalidAccessException()

    await next()
  }
}

module.exports = User
