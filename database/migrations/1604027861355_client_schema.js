'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name')
      table.string('cpf', 14).nullable().unique()

      table.string('birthday', 10).nullable()
      table.string('cellphone', 15).nullable()
      table.string('url')

      table.enu('gender', ['Masculino', 'Feminino', 'Outro']).defaultTo('Outro')
      table.enu('status', ['Active', 'Disabled']).defaultTo('Active')

      table.string('zip_code')
      table.string('address')
      table.string('number')
      table.string('district')
      table.string('complement')
      table.string('city')
      table.string('state')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
