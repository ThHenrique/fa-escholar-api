'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingCartSchema extends Schema {
  up () {
    this.create('shopping_cart', (table) => {
      table.increments()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index('client_id')

      table
        .integer('discipline_id')
        .unsigned()
        .references('id')
        .inTable('disciplines')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index('discipline_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('shopping_cart')
  }
}

module.exports = ShoppingCartSchema
