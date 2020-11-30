'use strict'
const Database = use('Database')
const DiscountCoupon = use('App/Models/DiscountCoupon')
const DiscountCouponType = use('App/Models/DiscountCouponType')
const DiscountCouponClient = use('App/Models/DiscountCouponClient')
const Purchase = use('App/Models/Purchase')

class DiscountClientController {
  async index({ response }) {
    try {
      const vouncherClients = await DiscountCouponClient.all()

      return vouncherClients
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async show({ response, params }) {
    try {
      const vouncherClient = await DiscountCouponClient.query()
        .where('id', params.id)
        .first()

      return vouncherClient
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
      const {
        discount_id,
        client_id,
        purchase_id,
        rebate
      } = request.all()

      let discountClient = await DiscountCouponClient.query()
        .where('discount_coupon_id', discount_id)
        .first()

      if (discountClient) {
        if (discountClient.purchase_id === parseInt(purchase_id || 0, 10)) {
          return response.status(204).send();
        }

        const discount = await DiscountCoupon.query()
          .where('id', discount_id)
          .first()

        return response.status(401).send({
          message: `O cupom ${discount.discount_coupon_cod} já foi usado no pedido #${discountClient.purchase_id}`
        })
      }

      discountClient = new DiscountCouponClient()
      discountClient.merge({
        discount_id,
        client_id,
        purchase_id,
      })

      const purchase = await Purchase.query()
        .where('id', purchase_id)
        .first();

      const purchase_price = purchase.purchases_price - rebate;

      purchase.merge({
        purchase_price
      })

      await purchase.save(trx)

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
      const vouncherClient = await VounchersClient.findOrFail(params.id)
      const data = request.all()
      vouncherClient.merge(data)
      await vouncherClient.save()
      return response.status(200).json(vouncherClient)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }

  async destroy({ params, response }) {
    try {
      const vouncherClient = await VounchersClient.findOrFail(params.id)

      await vouncherClient.delete()

      return response.status(200).json({ success: 'Deletado com sucesso' })
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao recuperar dados, tente novamente!' })
    }
  }
}

module.exports = DiscountClientController
