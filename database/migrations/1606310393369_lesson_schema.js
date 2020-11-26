'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LessonSchema extends Schema {
  up () {
    this.table('lessons', (table) => {
      table.string('url')
    })
  }

  down () {
    this.table('lessons', (table) => {
      // reverse alternations
    })
  }
}

module.exports = LessonSchema
