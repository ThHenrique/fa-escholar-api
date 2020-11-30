'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiscountCouponClientSchema extends Schema {
  up () {
    this.create('discount_coupon_clients', (table) => {
      table.increments()
      table.integer('discount_coupon_id').unsigned().references('id').inTable('discount_coupons')
      table.integer('purchase_id').unsigned().references('id').inTable('purchases')
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('discount_coupon_clients')
  }
}

module.exports = DiscountCouponClientSchema
