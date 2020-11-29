'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Discipline extends Model {
  session() {
    return this.hasMany('App/Models/Session')
  }
  wish_list() {
    return this.belongsToMany('App/Models/Client')
  }

  shopping_cart() {
    return this.belongsToMany('App/Models/Client')
  }
}

module.exports = Discipline
