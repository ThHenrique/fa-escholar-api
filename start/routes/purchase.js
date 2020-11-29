'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index/:id', 'PurchaseController.index').middleware(['auth'])
  Route.get('getHist', 'PurchaseController.getHistPurchases').middleware(['auth'])
  Route.get('show/:id', 'PurchaseController.show').middleware(['auth'])
  Route.post('store', 'PurchaseController.store').middleware(['auth'])
  Route.put('update/:id', 'PurchaseController.update').middleware(['auth'])
  Route.delete('delete/:id', 'PurchaseController.destroy').middleware(['auth'])

})
  .prefix('purchase')
  .namespace('PurchaseController')

