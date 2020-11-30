'use strict'
const Database = use('Database')
const DiscountCouponClient = use('App/Models/DiscountCouponClient')

class DiscountCouponClientController {
  async index({ response }) {
    try {
      const discountClient = await DiscountCouponClient.all()

      return discountClient
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async show({ response, params }) {
    try {
      const discountClient = await DiscountCouponClient.query()
        .where('id', params.id)
        .first()

      return discountClient
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()
      const discountClient = new DiscountCouponClient()
      discountClient.merge(data)
      await discountClient.save(trx)
      await trx.commit()
      return response.status(200).json(discountClient)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async update({ params, request, response }) {
    try {
      const discountClient = await DiscountCouponClient.findOrFail(params.id)
      const data = request.all()
      discountClient.merge(data)
      await discountClient.save()
      return response.status(200).json(discountClient)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async destroy({ params, response }) {
    try {
      const discountClient = await DiscountCouponClient.findOrFail(params.id)

      await discountClient.delete()

      return response.status(200).json({ success: 'Deletado com sucesso' })
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }
}

module.exports = DiscountCouponClientController
