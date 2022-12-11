import { Router } from 'express'
import BookController from '../controllers/book-controller'
import ChapterController from '../controllers/chapter-controller'
import VerseController from '../controllers/verse-controller'

const router = Router()

router.get('/book', BookController.getBooks)
router.get('/book/:bookId', BookController.getBook)
router.get('/book/:bookId/chapter', ChapterController.getChapters)
router.get('/book/:bookId/chapter/:chapterId', ChapterController.getChapter)
router.get('/book/:bookId/chapter/:chapterId/verse', VerseController.getVerses)
router.get('/book/:bookId/chapter/:chapterId/verse/:verseId', VerseController.getVerse)

export default router
