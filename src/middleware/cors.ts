import { CromoMiddleware } from 'cromo'

export const cors: CromoMiddleware = (context, next) => {
  const { request, responseInit } = context
  responseInit.headers = {
    ...responseInit.headers,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  }
  if (request.method === 'OPTIONS') {
    return Response.json({ message: 'ok' })
  }
  return next(context)
}
