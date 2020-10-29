'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Discipline extends Model {
  session() {
    return this.hasMany('App/Models/Session')
  }
}

module.exports = Discipline
