import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ params, responseInit }) => {
	const bookId = params.bookId[0].toUpperCase()
	const chapterId = params.chapterId[0].toLowerCase()
	const verseId = params.verseId
	const id = `${bookId}.${chapterId}`

	const regex = /^(\d+(?:-\d+)?)(,\d+(?:-\d+)?)*$/
	const isValid = regex.test(verseId)
	if (!isValid) {
		return Response.json({ error: 'Invalid verse format' }, 400)
	}

	const verseStrings: string[] = verseId.split(',')
	const verseLists = verseStrings.map((verseString) => {
		if (verseString.includes('-')) {
			const [start, end] = verseString.split('-').map(Number)
			return [...Array(end - start + 1)].map((_, i) => start + i).map(String)
		}
		return [verseString]
	})
	const verses = verseLists.flat().join(',')

	const db = new Database('./src/database/bible.db')
	const query = db.prepare(
		`SELECT id, number, reference, content, chapterId FROM verse WHERE chapterId = ?1 AND number IN (${verses})`,
	)
	const verse = query.all(id)

	if (!verse.length) {
		return Response.json({ error: 'Verse not found' }, 404)
	}

	return Response.json(verse, responseInit)
}
