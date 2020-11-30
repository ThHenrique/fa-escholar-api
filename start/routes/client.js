'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.put('wishlist', 'WishListController.wish_list').middleware(['auth'])
  Route.get('wishlist/show', 'WishListController.show').middleware(['auth'])

  Route.put('shoppingCart', 'ShoppingCartController.shopping_cart').middleware(['auth'])
  Route.get('shoppingCart/show', 'ShoppingCartController.show').middleware(['auth'])

  Route.resource('couponClient', 'DiscountClientController').apiOnly();
  Route.get('verifyDiscountCode', 'DiscountCouponController.verifyDiscountCode')
  Route.get('verifyFirstBuy', 'DiscountCouponController.verifyFirstBuy')
  Route.get('checkDiscountFirstBuy', 'DiscountCouponController.checkDiscountFirstBuy')

})
  .prefix('client')
  .namespace('Client')

