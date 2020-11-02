'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplineSchema extends Schema {
  up () {
    this.create('disciplines', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('description').nullable()
      table.string('image').nullable()
      table.string('objectives').nullable()
      table.string('about').nullable()
      table.decimal('price', 12, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('disciplines')
  }
}

module.exports = DisciplineSchema
