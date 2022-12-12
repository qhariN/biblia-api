import express, { json } from 'express'
import routes from './routes'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler } from './error-handler'

// Instancia de express
const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(json())
// app.use(catchErrors)

app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`)
})
