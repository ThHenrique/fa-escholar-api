'use strict'

const Database = use('Database')
const Discipline = use('App/Models/Discipline')
const Session = use('App/Models/Session')
const Lesson = use('App/Models/Lesson')
const File = use('App/Models/File')

class DisciplineController {

  async createSession({ request, response, params }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()

      const session = await Session.create({ ...data, discipline_id: params.id })
      await trx.commit()

      return response.status(200).send(session)
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async createLesson({ request, response, params }) {
    const trx = await Database.beginTransaction()
    try {
      const {session_id, ...data} = request.all()

      console.log(params.id);

      const session = await Session.query()
        .where('discipline_id', params.id)
        .where('id', session_id)
        .first()

      const lesson = new Lesson()
      lesson.merge({...data, session_id: session.id})
      await lesson.save(trx)

      await trx.commit()

      return response.status(200).send(lesson)
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async index({response, params, request}) {
    const {session_id} = request.headers()

    const sessions = await Session.query()
      .where('discipline_id', params.id)
      .where('id', session_id)
      .with('lesson')
      .first()

    return response.status(200).send(sessions)
  }

  async show({params, response}) {
    const discipline = await Discipline.query()
      .where('id', params.id)
      .with('session')
      .first()

    return response.status(200).send(discipline)
  }

  async destroySession({ response, params }) {
    try {
      const discipline = await Discipline.findOrFail(params.disciplineId)
      const session = await Session.query()
        .where('discipline_id', discipline.id)
        .where('id', params.sessionId)
        .first()
      await session.delete()
      return response.status(200).send()
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async destroyLesson({ response, params }) {
    try {
      const discipline = await Discipline.findOrFail(params.disciplineId)
      const session = await Session.query()
        .where('discipline_id', discipline.id)
        .where('id', params.sessionId)
        .first()

      const lesson = await Lesson.query()
        .where('session_id', session.id)
        .where('id', params.lessonId)
        .first()

      await lesson.delete()
      return response.status(200).send()
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }
}

module.exports = DisciplineController
