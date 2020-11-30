'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiscountCouponSchema extends Schema {
  up () {
    this.create('discount_coupons', (table) => {
      table.increments()
      table.integer('discount_coupon_types_id').unsigned().references('id').inTable('discount_coupon_types')
      table.string('discount_coupon_cod', 255)
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('disciplines_id').unsigned().references('id').inTable('disciplines')
      table.decimal('percent', 12, 2)
      table.decimal('value', 12, 2)
      table.string('due_date')
      table.string('observation', 500)
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('discount_coupons')
  }
}

module.exports = DiscountCouponSchema
