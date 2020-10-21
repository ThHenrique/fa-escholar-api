'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.on('/').render('welcome')
})
  .prefix('v1/admin')

