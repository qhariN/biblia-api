import { CromoMiddleware } from 'cromo'

export const log: CromoMiddleware = async (context, next) => {
  const { request, url } = context
  const response = await next(context)
  console.log(
    `${request.method.padStart(7)}:${response.status} -> ${url.pathname}`,
  )
  return response
}
