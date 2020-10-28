'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index', 'AdminController.index').middleware(['auth', 'admin'])
  Route.get('show/:id', 'AdminController.show').middleware(['auth', 'admin'])
  Route.put('update/:id', 'AdminController.update').middleware(['auth', 'admin'])
  Route.delete('delete/:id', 'AdminController.destroy').middleware(['auth', 'admin'])

})
  .prefix('admin')
  .namespace('Admin')

