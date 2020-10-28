'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User')
const Role = use('Role')

class AdminSeeder {
  async run () {
    const role = await Role.findBy('slug', 'admin')

    //Dev
    const dev = await User.create({
      email: 'developer@escholar.com.br',
      password: '@app.escholar2020'
    })

    await dev
      .admin()
      .create({ user_id: dev.id, role: 'admin', name: 'developer' })

    await dev.roles().attach([role.id])

    //egydio
    const user2 = await User.create({
      email: 'egydio@escholar.com.br',
      password: '@app.escholar2020'
    })

    await user2
      .admin()
      .create({ user_id: user2.id, role: 'admin', name: 'Egydio' })

    await user2.roles().attach([role.id])

  }
}

module.exports = AdminSeeder
