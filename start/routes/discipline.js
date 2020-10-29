'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index', 'DisciplineController.index').middleware(['auth', 'admin'])
  Route.get('show/:id', 'DisciplineController.show').middleware(['auth', 'admin'])
  Route.post('store', 'DisciplineController.store').middleware(['auth', 'admin'])
  Route.delete('delete/:id', 'DisciplineController.destroy').middleware(['auth', 'admin'])

})
  .prefix('discipline')
  .namespace('Discipline')

