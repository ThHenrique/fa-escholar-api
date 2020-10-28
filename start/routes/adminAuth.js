'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('signIn', 'AuthController.signIn').middleware(['guest'])
  Route.post('signUp', 'AuthController.signUp').middleware(['auth', 'admin'])
  Route.post('refresh', 'AuthController.refresh').middleware(['auth', 'admin'])
  Route.post('logout', 'AuthController.logout').middleware(['auth', 'admin'])
  Route.get('getUser', 'AuthController.getUser').middleware(['auth', 'admin'])
})
  .prefix('adminAuth')
  .namespace('AdminAuth')

