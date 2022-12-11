import { Request, Response } from 'express'
import { prisma } from '../prisma'

export default class ChapterController {
  static getChapters = async (req: Request, res: Response) => {
    const bookId = req.params.bookId.toUpperCase()
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId
      },
      select: {
        id: true,
        number: true,
        reference: true,
        bookId: true
      }
    })
    res.send(chapters)
  }

  static getChapter = async (req: Request, res: Response) => {
    const { bookId, chapterId } = req.params
    const id = `${bookId}.${chapterId}`.toUpperCase()
    const chapter = await prisma.chapter.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        number: true,
        reference: true,
        bookId: true
      }
    })
    res.send(chapter)
  }
}
