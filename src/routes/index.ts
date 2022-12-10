import { Router } from 'express'
import book from './book-router'

const routes = Router()

routes.use('/book', book)

export default routes
