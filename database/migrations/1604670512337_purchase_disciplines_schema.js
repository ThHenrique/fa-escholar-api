'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseDisciplinesSchema extends Schema {
  up () {
    this.create('purchase_disciplines', (table) => {
      table.increments()
      table
        .integer('discipline_id')
        .unsigned()
        .references('id')
        .inTable('disciplines')

      table
        .integer('purchase_id')
        .unsigned()
        .references('id')
        .inTable('purchases')

      table.decimal('price', 12, 2)
      table.string('name')

      table.timestamps()
    })
  }

  down () {
    this.drop('purchase_disciplines')
  }
}

module.exports = PurchaseDisciplinesSchema
