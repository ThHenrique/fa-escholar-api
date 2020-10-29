'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LessonSchema extends Schema {
  up () {
    this.create('lessons', (table) => {
      table.increments()
      table.integer('session_id')
        .unsigned()
        .references('id')
        .inTable('sessions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 254).notNullable()
      table.string('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('lessons')
  }
}

module.exports = LessonSchema
