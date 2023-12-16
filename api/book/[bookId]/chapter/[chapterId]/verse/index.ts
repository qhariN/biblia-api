import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId.toUpperCase()
	const chapterId = params.chapterId.toLowerCase()
	const id = `${bookId}.${chapterId}`

	const db = new Database('./src/database/bible.db')
	const query = db.query(
		'SELECT id, number, reference, chapterId FROM verse WHERE chapterId = ?1',
	)

	return Response.json(query.all(id), responseInit)
}
