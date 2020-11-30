'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index', 'AdminController.index')
  Route.get('show/:id', 'AdminController.show')
  Route.put('update/:id', 'AdminController.update')
  Route.delete('delete/:id', 'AdminController.destroy')

  Route.resource('discountCouponTypes', 'DiscountCouponTypesController').apiOnly();
  Route.resource('discountCoupon', 'DiscountCouponController').apiOnly();

})
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth', 'admin'])

