import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId[0].toUpperCase()
	const chapterId = params.chapterId.toLowerCase()
	const id = `${bookId}.${chapterId}`

	const db = new Database('./src/database/bible.db')
	const query = db.query(
		'SELECT id, number, reference, bookId FROM chapter WHERE id = ?1',
	)
	const chapter = query.get(id)

	if (!chapter) {
		return Response.json({ error: 'Chapter not found' }, 404)
	}

	return Response.json(chapter, responseInit)
}
