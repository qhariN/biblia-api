import { Request, Response } from 'express'
import { prisma } from '../prisma'

export default class VerseController {
  static getVerses = async (req: Request, res: Response) => {
    const { bookId, chapterId } = req.params
    const id = `${bookId}.${chapterId}`.toUpperCase()
    const verses = await prisma.verse.findMany({
      where: {
        chapterId: id
      },
      select: {
        id: true,
        number: true,
        reference: true,
        chapterId: true
      }
    })
    res.send(verses)
  }

  static getVerse = async (req: Request, res: Response) => {
    const { bookId, chapterId, verseId } = req.params

    const regex = /^(\d+(?:-\d+)?)(,\d+(?:-\d+)?)*$/
    const isValid = regex.test(verseId)
    if (!isValid) throw new Error('Invalid verse format')

    const id = `${bookId}.${chapterId}`.toUpperCase()
    const verseStrings = verseId.split(',')
    const verseLists = verseStrings.map((verseString) => {
      if (verseString.includes('-')) {
        const [start, end] = verseString.split('-').map(Number)
        return [...Array(end - start + 1)].map((_, i) => start + i).map(String)
      } else {
        return [verseString]
      }
    })
    const verses = verseLists.flat()
    const verse = await prisma.verse.findMany({
      where: {
        chapterId: id,
        number: {
          in: verses
        }
      },
      select: {
        id: true,
        number: true,
        reference: true,
        content: true,
        chapterId: true
      }
    })
    res.send(verse)
  }
}
