'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Purchase extends Model {
  client() {
    return this.belongsTo('App/Models/Client')
  }

  discipline() {
    return this.hasMany('App/Models/PurchaseDiscipline')
  }
}

module.exports = Purchase
