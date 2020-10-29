'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Session extends Model {
  discipline() {
    return this.belongsTo('App/Models/Discipline')
  }

  lesson() {
    return this.hasMany('App/Models/Lesson')
  }
}

module.exports = Session
