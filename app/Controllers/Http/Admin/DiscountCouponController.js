'use strict'
const Database = use('Database');
const DiscountCoupon = use('App/Models/DiscountCoupon')

class DiscountCouponController {
async index({ response }) {
    try {
      const discountCoupon = await DiscountCoupon.all();

      return response.json(discountCoupon);
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async show({ params, response }) {
    try {
      const discountCoupon = await DiscountCoupon.query()
        .where('id', params.id)
        .first()

      return response.json(discountCoupon);
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async store({ response, request }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()
      const discountCoupon = new DiscountCoupon()
      discountCoupon.merge(data)
      await discountCoupon.save(trx)
      await trx.commit()
      return response.status(200).json(discountCoupon)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async update({ response, request, params }) {
    try {
      const discountCoupon = await DiscountCoupon.findOrFail(params.id)
      const data = request.all()
      discountCoupon.merge(data)
      await discountCoupon.save()
      return response.status(200).json(discountCoupon)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' });
    }
  }

  async destroy({ response, params }) {
    try {
      const discountCoupon = await DiscountCoupon.findOrFail(params.id);

      await discountCoupon.delete();

      return response.status(200).json({ success: 'Deletado com sucesso' });
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }
}

module.exports = DiscountCouponController
