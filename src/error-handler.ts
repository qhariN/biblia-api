import { NotFoundError } from '@prisma/client/runtime'
import { NextFunction, Request, Response } from 'express'

export const catchErrors = (handler: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return handler(req, res, next).catch((err: any) => {
      next(err)
    })
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send({ error: 'Recurso no encontrado' })
    } else if (err instanceof Error) {
      res.status(400).send({ error: err.message })
    } else {
      res.status(500).send({ error: 'Error interno del servidor' })
    }
  } else {
    next()
  }
}
