'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {
  lesson() {
    return this.belongsTo('App/Models/Lesson')
  }
}

module.exports = File
