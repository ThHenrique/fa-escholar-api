'use strict'

const Role = use('Role')

class RoleSeeder {
  async run () {
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do Sistema'
    })

    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente do Sistema'
    })

    await Role.create({
      name: 'Default',
      slug: 'default',
      description: 'Usuário da Escholar'
    })
  }
}

module.exports = RoleSeeder
