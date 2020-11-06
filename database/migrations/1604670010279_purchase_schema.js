'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseSchema extends Schema {
  up () {
    this.create('purchases', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.decimal('purchases_price', 12, 2)
      table.enu('payment', ['Debit', 'Credit', 'Cash'])
      table
        .enu('status', [
          'Pending',
          'Canceled',
          'Accepted'
        ])
        .defaultTo('Accepted')
      table.timestamps()
    })
  }

  down () {
    this.drop('purchases')
  }
}

module.exports = PurchaseSchema
