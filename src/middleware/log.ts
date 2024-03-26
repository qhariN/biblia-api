import { CromoMiddleware } from 'cromo'

export const log: CromoMiddleware = async (context, next) => {
  const { request, url } = context
  const response = await next(context)

  const datetime = new Date().toISOString().replace('T', ' ').replace('Z', '')
  const method = request.method.padStart(7)
  const status = response.status
  const path = url.pathname
  console.log(`${datetime} ${method}:${status} -> ${path}`)

  return response
}
