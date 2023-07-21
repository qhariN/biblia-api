import { Cromo } from 'cromo'
import { cors } from './middleware/cors'

const cromo = new Cromo()

cromo.setMiddleware([cors])

cromo.listen(port => {
  console.log(`Listening on http://localhost:${port}...`)
})
