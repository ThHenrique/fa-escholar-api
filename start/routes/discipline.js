'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index', 'DisciplineController.index')
  Route.get('show/:id', 'DisciplineController.show')
  Route.post('create', 'DisciplineController.storeDiscipline').middleware(['auth', 'admin'])
  Route.post('create/session/:id', 'DisciplineController.storeSession').middleware(['auth', 'admin'])
  Route.post('image/:id', 'ImageController.uploadImage').middleware(['auth', 'admin'])


  // Route.post('store', 'DisciplineController.store').middleware(['auth', 'admin'])
  Route.put('update/:id', 'DisciplineController.update').middleware(['auth', 'admin'])
  Route.delete('delete/:id', 'DisciplineController.destroy').middleware(['auth', 'admin'])

})
  .prefix('discipline')
  .namespace('Discipline')

