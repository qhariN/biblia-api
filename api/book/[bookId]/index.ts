import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId.toUpperCase()

	const db = new Database('./src/database/bible.db')
	const query = db.query(
		'SELECT id, abbreviation, name, nameLong FROM book WHERE id = ?1',
	)
	const book = query.get(bookId)

	if (!book) {
		return Response.json({ error: 'Book not found' }, 404)
	}

	return Response.json(book, responseInit)
}
