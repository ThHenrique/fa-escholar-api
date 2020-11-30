'use strict'
const DiscountCouponType = use('App/Models/DiscountCouponType')
const Database = use('Database')

class DiscountCouponTypesController {
  async index({ response }) {
    try {
      const discountCouponTypes = await DiscountCouponType.all();

      return response.json(discountCouponTypes);
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async show({ params, response }) {
    try {
      const discountCouponTypes = await DiscountCouponType.query()
        .where('id', params.id)
        .first()

      return response.json(discountCouponTypes);
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
      const discountCouponTypes = new DiscountCouponType()
      discountCouponTypes.merge(data)
      await discountCouponTypes.save(trx)
      await trx.commit()
      return response.status(200).json(discountCouponTypes)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async update({ response, params, request }) {
    try {
      const discountCouponTypes = await DiscountCouponType.findOrFail(params.id)
      const data = request.all()
      discountCouponTypes.merge(data)
      await discountCouponTypes.save()
      return response.status(200).json(discountCouponTypes)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' });
    }
  }

  async destroy({ response, params }) {
    try {
      const discountCouponTypes = await DiscountCouponType.findOrFail(params.id);

      await discountCouponTypes.delete();

      return response.status(200).json({ success: 'Deletado com sucesso' });
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }
}

module.exports = DiscountCouponTypesController
