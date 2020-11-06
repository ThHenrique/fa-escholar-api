'use strict'

const Database = use('Database')
const Purchase = use('App/Models/Purchase')
const Discipline = use('App/Models/Discipline')
const Client = use('App/Models/Client')
const PurchaseDiscipline = use('App/Models/PurchaseDiscipline')

class PurchaseController {
  async index({ response, auth, params }) {
    try {
      const user = await auth.getUser()
      const client = await Client.query()
        .where('id', '=', params.id)
        .first()
      const purchase = await Purchase.query()
        .where('client_id', client.id)
        .with('discipline')
        .fetch()

      // await Promise.all(
      //   purchase.rows.map(async purchase => {
      //     console.log(purchase.discipline);
      //     const logoURL = await Database.select('image')
      //       .from('disciplines')
      //       .where('discipline_id', '=', purchase.discipline.id)

      //     purchase = Object.assign(purchase, {
      //       image: logoURL[0].image
      //     })
      //   })
      // )

      return response.status(200).send(purchase)
    } catch (error) {
      console.log(error)
      return response.status(error.status).send(error)
    }
  }

  async show({ params, response }) {
    try {
      let purchase = await Purchase.query()
        .where('id', params.id)
        .with('client')
        .with('discipline')
        .first()

      return response.status(200).send(purchase)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { disciplines,...data } = request.all()

      const purchase = new Purchase()
      purchase.merge(data)

      let purchase_price = 0
      for (var i = 0; i < disciplines.length; i++) {
        const discipline = await Discipline.findOrFail(disciplines[i])

        purchase_price += discipline.price

        await purchase.discipline().create(
          {
            discipline_id: discipline.id,
            name: discipline.name,
            price: discipline.price
          },
          trx
        )
      }

      const total_price = purchase_price

      purchase.merge({
        purchases_price: total_price,
      })

      await purchase.save(trx)
      await trx.commit()

      return response.status(200).send()
    } catch (error) {
      console.log({ error })
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { status } = request.only(['status'])

      const order = await Order.findOrFail(params.id)

      if (status == 'Cancelled') {
        const res = await apiFinance
          .post(`/reversals`, {
            orderId: order.id
          })
          .catch(e => {
            console.log(e.response)
            return e
          })

        if (res.status != 200)
          return response.status(400).send('Falha durante estorno do cartão!')

        order.merge({ status })
        await order.save(trx)

        const butcheryId = order.butchery_id
        const clientId = order.client_id

        ButcheryNotification(
          butcheryId,
          `Pedido atualizado: #${order.id}`,
          'Pedido foi cancelado'
        )
        Ws.emit('update:order', { butcheryId, clientId, msg: order })
      } else {
        order.merge({ status })
        await order.save(trx)

        const butcheryId = order.butchery_id
        const orderData = await Order.query()
          .where('id', order.id)
          .with('client')
          .first()

        const client = await Client.find(order.client_id)

        ButcheryNewOrderNotification(butcheryId, order.id, client.name)
        Ws.emit('new:order', { butcheryId, msg: orderData })
      }

      await trx.commit()
      return response.status(200).send()
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }
}

module.exports = PurchaseController
