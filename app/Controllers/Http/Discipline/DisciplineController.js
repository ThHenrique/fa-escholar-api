'use strict'

const Database = use('Database')
const Discipline = use('App/Models/Discipline')
const Session = use('App/Models/Session')
const Lesson = use('App/Models/Lesson')
const File = use('App/Models/File')

class DisciplineController {

  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()

      const discipline = new Discipline()
      discipline.merge(data)
      await discipline.save(trx)

      await trx.commit()

      return response.status(200).send(discipline)
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  // async store({ request, response }) {
  //   const trx = await Database.beginTransaction()
  //   try {
  //     const {sessions, ...data} = request.all()

  //     const discipline = new Discipline()
  //     discipline.merge(data)
  //     await discipline.save(trx)

  //     sessions.forEach(async session => {
  //       const resultSession = await Session.create({
  //         discipline_id: discipline.id,
  //         name: session.name,
  //       })

  //       session.lessons.forEach(async lesson => {
  //         const resultLesson = await Lesson.create({
  //           session_id: resultSession.id,
  //           name: lesson.name,
  //           description: lesson.description,
  //         })

  //         lesson.files.forEach(async file => {
  //           await File.create({
  //             lesson_id: resultLesson.id,
  //             doc_url: file.doc_url,
  //           })
  //         })
  //       })
  //     })

  //     await trx.commit()

  //     return response.status(200).send()
  //   } catch (error) {
  //     console.log(error);
  //     await trx.rollback()
  //     return response.status(error.status).send(error)
  //   }
  // }

  async update({ request, response, params }) {
    const trx = await Database.beginTransaction()
    try {
      const {sessions, ...data} = request.all()

      const discipline = await Discipline.find(params.id)

      sessions.forEach(async session => {
        const resultSession = await Session.create({
          id: session.id,
          discipline_id: discipline.id,
          name: session.name,
        })

        session.lessons.forEach(async lesson => {
          const resultLesson = await Lesson.create({
            id: lesson.id,
            session_id: resultSession.id,
            name: lesson.name,
            description: lesson.description,
          })

          lesson.files.forEach(async file => {
            await File.create({
              id: file.id,
              lesson_id: resultLesson.id,
              doc_url: file.doc_url,
            })
          })
        })
      })

      discipline.merge(data)
      await discipline.save(trx)
      await trx.commit()

      return response.status(200).send()
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async index({response}) {
    const discipline = await Discipline.query().fetch()
    return response.status(200).send(discipline)
  }

  async show({params, response}) {
    const discipline = await Discipline.query()
      .where('id', params.id)
      .with('session')
      .first()

    return response.status(200).send(discipline)
  }

  async destroy({ params, response }) {
    try {
      const discipline = await Discipline.findOrFail(params.id)
      await discipline.delete()
      return response.status(200).send()
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

module.exports = DisciplineController
