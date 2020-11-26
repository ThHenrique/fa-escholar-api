'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.get('index', 'DisciplineController.index')
  Route.get('show/:id', 'DisciplineController.show')
  Route.post('create', 'DisciplineController.store').middleware(['auth', 'admin'])
  Route.post('create/session/:id', 'LessonController.createSession').middleware(['auth', 'admin'])
  Route.post('/session/lesson/create/:id', 'LessonController.createLesson').middleware(['auth', 'admin'])
  Route.post('/session/lesson/file/:id', 'ImageController.uploadLessonImage').middleware(['auth', 'admin'])

  Route.post('image/:id', 'ImageController.uploadImage').middleware(['auth', 'admin'])

  Route.get('session/lesson/:id', 'LessonController.index').middleware(['auth', 'admin'])
  Route.delete('session/delete/:disciplineId/:sessionId',
    'LessonController.destroySession')
      .middleware(['auth', 'admin'])

  Route.delete('session/lesson/delete/:disciplineId/:sessionId/:lessonId',
    'LessonController.destroyLesson')
      .middleware(['auth', 'admin'])


  // Route.post('store', 'DisciplineController.store').middleware(['auth', 'admin'])
  Route.put('update/:id', 'DisciplineController.update').middleware(['auth', 'admin'])
  Route.delete('delete/:id', 'DisciplineController.destroy').middleware(['auth', 'admin'])

})
  .prefix('discipline')
  .namespace('Discipline')

