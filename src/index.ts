import { Cromo } from 'cromo'
import { cors } from './middleware/cors'
import { log } from './middleware/log'

const cromo = new Cromo()

cromo.setMiddleware([cors, log])

cromo.start((port) => {
  console.log(`Listening on http://localhost:${port}...`)
})
