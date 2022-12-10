import { Request, Response } from 'express'
import { prisma } from '../prisma'

export default class BookController {
  static getBooks = async (req: Request, res: Response) => {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        abbreviation: true,
        name: true,
        nameLong: true
      }
    })
    res.send(books)
  }
}
