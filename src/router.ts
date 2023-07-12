import { parse } from 'regexparam'

export class Router {
  response: Response

  constructor (private request: Request) {
    this.response = new Response(null, { status: 404 })
  }

  get (path: string, callback: (params: Record<string, string | null>, response: { json: (body: Object, status?: number) => Response }) => Response) {
    const { url, method } = this.request
    const { pathname } = new URL(url)
    const regexparam = parse(path)

    if (!regexparam.pattern.test(pathname) || method !== 'GET') return

    const params = Router.exec(pathname, regexparam)
    this.response = callback(params, Router.response())
  }

  static exec (path: string, result: { pattern: RegExp, keys: string[] }) {
    let i = 0
    const out: Record<string, string | null> = { }
    const matches = result.pattern.exec(path)
    while (i < result.keys.length) {
      out[result.keys[i]] = (matches && matches[++i]) || null
    }
    return out
  }

  static response () {
    return {
      json: (body: Object, status: number = 200) => new Response(JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
        status
      })
    }
  }
}