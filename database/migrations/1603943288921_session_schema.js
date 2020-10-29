'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SessionSchema extends Schema {
  up () {
    this.create('sessions', (table) => {
      table.increments()
      table.integer('discipline_id')
        .unsigned()
        .references('id')
        .inTable('disciplines')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sessions')
  }
}

module.exports = SessionSchema
