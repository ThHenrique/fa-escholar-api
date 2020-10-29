'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lesson extends Model {
  session() {
    return this.belongsTo('App/Models/Session')
  }

  file() {
    return this.hasMany('App/Models/File')
  }
}

module.exports = Lesson
