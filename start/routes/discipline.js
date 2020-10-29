'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.post('store', 'DisciplineController.store').middleware(['auth', 'admin'])
  Route.delete('delete/:id', 'DisciplineController.destroy').middleware(['auth', 'admin'])

})
  .prefix('discipline')
  .namespace('Discipline')

