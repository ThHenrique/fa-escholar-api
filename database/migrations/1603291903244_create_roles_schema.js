'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateRolesSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.string('name').notNullable().unique()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = CreateRolesSchema
