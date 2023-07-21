import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
  const bookId = params.bookId.toUpperCase()

  const db = new Database('./src/database/bible.db')
  const query = db.query('SELECT id, number, reference, bookId FROM chapter WHERE bookId = ?1')

  return Response.json(query.all(bookId), responseInit)
}
