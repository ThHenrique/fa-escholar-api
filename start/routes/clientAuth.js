'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('signUp', 'AuthController.signUp').middleware(['guest'])
  Route.put('update', 'AuthController.update').middleware(['auth'])
  Route.post('signIn', 'AuthController.signIn').middleware(['guest'])
  Route.get('getUser', 'AuthController.getUser').middleware(['auth'])
  Route.post('refresh', 'AuthController.refresh').middleware(['auth', 'user'])
  Route.post('logout', 'AuthController.logout').middleware(['auth', 'user'])
  Route.post('sendMail', 'AuthController.sendMail')
  Route.get('index', 'AuthController.index')

})
  .prefix('clientAuth')
  .namespace('ClientAuth')

