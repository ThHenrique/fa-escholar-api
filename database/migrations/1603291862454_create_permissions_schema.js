'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePermissionsSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.string('name').notNullable().unique()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = CreatePermissionsSchema
