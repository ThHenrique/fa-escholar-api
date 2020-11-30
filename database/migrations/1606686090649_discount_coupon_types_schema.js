'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiscountCouponTypesSchema extends Schema {
  up () {
    this.create('discount_coupon_types', (table) => {
      table.increments()
      table.string('description', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('discount_coupon_types')
  }
}

module.exports = DiscountCouponTypesSchema
