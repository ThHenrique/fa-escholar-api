'use strict'

const Database = use('Database')
const Purchase = use('App/Models/Purchase')
const Discipline = use('App/Models/Discipline')
const Client = use('App/Models/Client')
const PurchaseDiscipline = use('App/Models/PurchaseDiscipline')

class PurchaseController {
  async index({ response, auth, params }) {
    try {
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

  async getHistPurchases({ response, auth }) {
    try {
      const user = await auth.getUser()
      const client = await user.client().fetch()

      const purchase = await Purchase.query()
        .where('client_id', client.id)
        .fetch()

      let disciplines = []

      await Promise.all(
        purchase.rows.map(async item => {
          const purchaseDiscipline = await PurchaseDiscipline.query()
            .where('purchase_id', '=', item.id)
            .fetch()
          disciplines.push(purchaseDiscipline)
        })
      )
      return response.status(200).send(disciplines)
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

      const purchase = await Purchase.findOrFail(params.id)

      purchase.merge({ status })
      await purchase.save(trx)

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
