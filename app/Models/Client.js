'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  purchases() {
    return this.hasMany('App/Models/Purchase')
  }

  wish_list() {
    return this.belongsToMany('App/Models/Discipline').pivotTable(
      'client_disciplines'
    )
  }

  shopping_cart() {
    return this.belongsToMany('App/Models/Discipline').pivotTable(
      'shopping_cart'
    )
  }
}

module.exports = Client
