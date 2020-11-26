'use strict'

const Drive = use('Drive')
const Discipline = use('App/Models/Discipline')
const Session = use('App/Models/Session')
const Lesson = use('App/Models/Lesson')

class ImageController {

  async uploadImage({ request, response, params }) {
    try {
      let url
      const discipline = await Discipline.findOrFail(params.id)

      request.multipart.file('file', {}, async file => {
        const ContentType = file.headers['content-type']
        const name = `${Date.now()}-${file.clientName}`;
        const ACL = 'public-read'
        const Key = `${name}.${file.subtype}`
        const Url = await Drive.put(`discipline/${Key}`, file.stream, {
          ContentType,
          ACL
        })
        url = Url
      })
      await request.multipart.process()
      discipline.image = url;
      await discipline.save()

      if (url) return response.status(200).send(url)
      else return response.status(500).send('Algo inesperado aconteceu!')
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async uploadLessonImage({ response, params, request}) {
    try {
      const {session_id, lesson_id} = request.headers()

      const session = await Session.query()
      .where('discipline_id', params.id)
      .where('id', session_id)
      .first()

      const lesson = await Lesson.query()
      .where('session_id', session.id)
      .where('id', lesson_id)
      .first()

      let url
      request.multipart.file('file', {}, async file => {
        const ContentType = file.headers['content-type']
        const name = `${Date.now()}-${file.clientName}`;
        const ACL = 'public-read'
        const Key = `${name}.${file.subtype}`
        const Url = await Drive.put(`discipline/file/${Key}`, file.stream, {
          ContentType,
          ACL
        })
        url = Url
      })
      await request.multipart.process()
      lesson.url = url;
      await lesson.save()

      if (url) return response.status(200).send(url)
      else return response.status(500).send('Algo inesperado aconteceu!')
    } catch (error) {
      console.log(error);
      return response.status(500).send(error)
    }
  }

}
module.exports = ImageController
