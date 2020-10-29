'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.integer('lesson_id')
        .unsigned()
        .references('id')
        .inTable('lessons')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('doc_url')

      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
