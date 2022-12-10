import { Router } from 'express'
import BookController from '../controllers/book-controller'

const router = Router()

router.get('/', BookController.getBooks)

export default router
