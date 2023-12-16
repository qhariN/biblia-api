import { CromoMiddleware } from 'cromo'

export const log: CromoMiddleware = (context, next) => {
	const { request, url } = context
	console.log(`${request.method.padStart(7)} -> ${url.pathname}`)
	return next(context)
}
