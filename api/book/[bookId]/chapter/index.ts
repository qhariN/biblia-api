import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId.toUpperCase()

	const db = new Database('./src/database/bible.db')
	const chapters = db
		.query(
			'SELECT id, number, reference, bookId FROM chapter WHERE bookId = ?1',
		)
		.all(bookId)

	if (!chapters.length) {
		return Response.json({ error: 'Book not found' }, 404)
	}

	return Response.json(chapters, responseInit)
}
