import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const verseId = params.id.toUpperCase()

	const db = new Database('./src/database/bible.db')
	const query = db.prepare(
		'SELECT id, number, reference, content, chapterId FROM verse WHERE id = ?1',
	)

	const verse = query.get(verseId)
	if (!verse) {
		return Response.json({
			status: 404,
			statusText: 'Verse not found',
		})
	}

	return Response.json(verse, responseInit)
}
