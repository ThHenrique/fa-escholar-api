'use strict'

const Client = use('App/Models/Client')

class WishListController {
  async wish_list({ auth, request, response }) {
    const user = await auth.getUser()
    const client = await user.client().fetch()

    const { wish_list, ...data } = request.only(['wish_list'])

    client.merge(data)

    await client.save()

    if (wish_list && wish_list.length > 0) {
      await client.wish_list().sync(wish_list)
      await client.load('wish_list')
    }
    return response.status(200).send(client)
  }

  async show({ auth, response }) {
    const user = await auth.getUser()
    const client = await Client.query()
      .with('wish_list')
      .where('user_id', user.id)
      .first()

    return response.status(200).send(client)
  } catch (error) {
    console.log(error)
    return response.status(error.status).send(error)
  }
}

module.exports = WishListController
