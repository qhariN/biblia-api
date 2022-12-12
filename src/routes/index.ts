import { Router } from 'express'
import BookController from '../controllers/book-controller'
import ChapterController from '../controllers/chapter-controller'
import VerseController from '../controllers/verse-controller'
import { catchErrors } from '../error-handler'

const router = Router()

router.get('/book', catchErrors(BookController.getBooks))
router.get('/book/:bookId', catchErrors(BookController.getBook))
router.get('/book/:bookId/chapter', catchErrors(ChapterController.getChapters))
router.get('/book/:bookId/chapter/:chapterId', catchErrors(ChapterController.getChapter))
router.get('/book/:bookId/chapter/:chapterId/verse', catchErrors(VerseController.getVerses))
router.get('/book/:bookId/chapter/:chapterId/verse/:verseId', catchErrors(VerseController.getVerse))

export default router
