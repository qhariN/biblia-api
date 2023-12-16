import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId.toUpperCase()

	const db = new Database('./src/database/bible.db')
	const query = db.query(
		'SELECT id, abbreviation, name, nameLong FROM book WHERE id = ?1',
	)
	const book = query.get(bookId)

	return Response.json(book, responseInit)
}
