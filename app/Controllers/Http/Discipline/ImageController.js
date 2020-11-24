'use strict'

const Drive = use('Drive')
const Discipline = use('App/Models/Discipline')

class ImageController {

  async uploadImage({ request, response, params }) {
    try {
      let url
      const discipline = await Discipline.findOrFail(params.id)

      request.multipart.file('file', {}, async file => {
        const name = `${Date.now()}-${file.clientName}`;
        const ContentType = file.headers['content-type']
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

  async uploadLessonImage({ request, response }) {
    try {
      let url
      const random_string = await str_random(64)
      request.multipart.file('image', {}, async file => {
        const ContentType = file.headers['content-type']
        const ACL = 'public-read'
        const Key = `${random_string}.${file.subtype}`
        const Url = await Drive.put(`deliveryman/file/${Key}`, file.stream, {
          ContentType,
          ACL
        })
        url = Url
      })
      await request.multipart.process()
      if (url) return response.status(200).send(url)
      else return response.status(500).send('Algo inesperado aconteceu!')
    } catch (e) {
      return response.status(error.status).send(error)
    }
  }

}
module.exports = ImageController
