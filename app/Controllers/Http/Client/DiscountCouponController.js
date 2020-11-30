'use strict'
const DiscountCoupon = use('App/Models/DiscountCoupon')
const DiscountCouponType = use('App/Models/DiscountCouponType')
const DiscountCouponClient = use('App/Models/DiscountCouponClient')
const Purchase = use('App/Models/Purchase')
const moment = require('moment');

const isDiscountFirstBuy = async discountCode => {
  const discountType = await DiscountCouponType.query()
    .where('description', 'WELCOME10')
    .first()

  if (!discountType) {
    return false;
  }

  const discountFirstBuy = await DiscountCoupon.query()
    .where('discount_coupon_types_id', discountType.id)
    .where('active', true)
    .first()

  if (!discountFirstBuy) {
    return false;
  }

  if (discountFirstBuy.discount_coupon_cod !== discountCode) {
    return false;
  }

  return true;
}

class DiscountCouponController {
  async verifyDiscountCode({ request, response, auth }) {
    try {
      const discountCode = decodeURI(request.input('discountCode'))
      const disciplineId = parseInt(request.input('disciplineId') || '0')
      const discount = await DiscountCoupon.query()
        .where('discount_coupon_cod', discountCode)
        .where('active', true)
        .first()

      if (!discount) {
        return response
          .status(404)
          .send({ message: 'Nenhum cupom ativo encontrado com esse código' })
      }

      const isdiscountfirstbuy = await isDiscountFirstBuy(discountCode)
      if (!isdiscountfirstbuy) {
        const discountClient = await DiscountCouponClient.query()
          .where('discount_coupon_id', discount.id)
          .first()

        if (discountClient) {
          return response.status(401).send({
            message: `Este cupom já foi usado${
              discountClient.purchase_id
                ? ` no pedido #${discountClient.purchase_id}`
                : ''
            }`
          })
        }
      }

      if (discount.due_date) {
        const today = moment().format('YYYY-MM-DD HH:mm:ss')
        const parsedDueDate = moment(discount.due_date, 'YYYY-MM-DD HH:mm:ss')

        if (moment(today).isAfter(parsedDueDate)) {
          return response.status(401).send({ message: 'Cupom Vencido' })
        }
      }

      return response.json(discount)
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async verifyFirstBuy({ request, response, auth }) {
    try {
      const user = await auth.getUser()
      const client = await user.client().fetch()

      const purchase = await Purchase.query()
        .where('client_id', '=', client.id)
        .first()

      if (purchase) {
        return response.status(401).send({
          message: 'Cupom não aplicavel. Cliente já possui pedido'
        })
      }

      const discountType = await DiscountCouponType.query()
        .where('description', 'WELCOME10')
        .first()

      if (!discountType) {
        return response.status(401).send({
          message: 'Cupom não aplicavel. Nenhum tipo de cupom WELCOME10'
        })
      }

      const discountFirstBuy = await DiscountCoupon.query()
        .where('discount_coupon_types_id', discountType.id)
        .where('active', true)
        .first()

      if (!discountFirstBuy) {
        return response.status(401).send({
          message: 'Cupom não aplicavel. Nenhum cupom do tipo WELCOME10'
        })
      }

      return response.json({
        discount: discountFirstBuy,
      })
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }

  async checkDiscountFirstBuy({ request, response }) {
    try {
      const discountCode = decodeURI(request.input('discountCode'))
      const is = await isDiscountFirstBuy(discountCode);
      response.json(is);
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha ao realizar a operação. Tente novamente.' })
    }
  }
}

module.exports = DiscountCouponController
