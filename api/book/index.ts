import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ responseInit }) => {
  const db = new Database('./src/database/bible.db')
  const query = db.query('SELECT id, abbreviation, name, nameLong FROM book')

  return Response.json(query.all(), responseInit)
}
