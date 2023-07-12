import Database from 'bun:sqlite'
import { Router } from './router'

const server = Bun.serve({
  fetch (request) {
    const router = new Router(request)

    router.get('/book', (params, response) => {
      const db = new Database('./src/database/bible.db')
      const query = db.query('SELECT id, abbreviation, name, nameLong FROM book')
      return response.json(query.all())
    })

    router.get('/book/:bookId', (params, response) => {
      const bookId = params.bookId!.toUpperCase()
      const db = new Database('./src/database/bible.db')
      const query = db.query('SELECT id, abbreviation, name, nameLong FROM book WHERE id = ?1')
      const book = query.get(bookId) as Object
      return response.json(book)
    })

    router.get('/book/:bookId/chapter', (params, response) => {
      const bookId = params.bookId!.toUpperCase()
      const db = new Database('./src/database/bible.db')
      const query = db.query('SELECT id, number, reference, bookId FROM chapter WHERE bookId = ?1')
      return response.json(query.all(bookId))
    })

    router.get('/book/:bookId/chapter/:chapterId', (params, response) => {
      const bookId = params.bookId!.toUpperCase()
      const chapterId = params.chapterId!.toLowerCase()
      const id = `${bookId}.${chapterId}`
      const db = new Database('./src/database/bible.db')
      const query = db.query('SELECT id, number, reference, bookId FROM chapter WHERE id = ?1')
      const chapter = query.get(id) as Object
      return response.json(chapter)
    })

    router.get('/book/:bookId/chapter/:chapterId/verse', (params, response) => {
      const bookId = params.bookId!.toUpperCase()
      const chapterId = params.chapterId!.toLowerCase()
      const id = `${bookId}.${chapterId}`
      const db = new Database('./src/database/bible.db')
      const query = db.query('SELECT id, number, reference, chapterId FROM verse WHERE chapterId = ?1')
      return response.json(query.all(id))
    })

    router.get('/book/:bookId/chapter/:chapterId/verse/:verseId', (params, response) => {
      const bookId = params.bookId!.toUpperCase()
      const chapterId = params.chapterId!.toLowerCase()
      const verseId = params.verseId!
      const id = `${bookId}.${chapterId}`

      const regex = /^(\d+(?:-\d+)?)(,\d+(?:-\d+)?)*$/
      const isValid = regex.test(verseId)
      if (!isValid) return response.json({ error: 'Invalid verse format' }, 400)

      const verseStrings = verseId.split(',')
      const verseLists = verseStrings.map((verseString) => {
        if (verseString.includes('-')) {
          const [start, end] = verseString.split('-').map(Number)
          return [...Array(end - start + 1)].map((_, i) => start + i).map(String)
        } else {
          return [verseString]
        }
      })
      const verses = verseLists.flat().join(',')

      const db = new Database('./src/database/bible.db')
      const query = db.prepare(`SELECT id, number, reference, content, chapterId FROM verse WHERE chapterId = ?1 AND number IN (${verses})`)
      const verse = query.all(id) as Object
      return response.json(verse)
    })

    return router.response
  }
})

console.log(`Listening on http://localhost:${server.port}...`)