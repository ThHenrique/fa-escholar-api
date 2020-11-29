'use strict'

const Client = use('App/Models/Client')

class ShoppingCartController {
  async shopping_cart({ auth, request, response }) {
    const user = await auth.getUser()
    const client = await user.client().fetch()

    const { shopping_cart, ...data } = request.only(['shopping_cart'])

    client.merge(data)

    await client.save()

    if (shopping_cart && shopping_cart.length > 0) {
      await client.shopping_cart().sync(shopping_cart)
      await client.load('shopping_cart')
    }
    return response.status(200).send(client)
  }

  async show({ auth, response }) {
    const user = await auth.getUser()
    const client = await Client.query()
      .with('shopping_cart')
      .where('user_id', user.id)
      .first()

    return response.status(200).send(client)
  } catch (error) {
    console.log(error);
    return response.status(error.status).send(error)
  }
}

module.exports = ShoppingCartController
