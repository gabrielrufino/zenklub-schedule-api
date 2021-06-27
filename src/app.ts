import express from 'express'
import helmet from 'helmet'
import path from 'path'
import swaggerUI from 'swagger-ui-express'
import { load } from 'yamljs'

import router from './routers'

const app = express()

app.use([
  helmet(),
  express.json()
])
app.use('/api', router)
app.use('/',
  swaggerUI.serve,
  swaggerUI.setup(
    load(
      path.join(__dirname, 'docs', 'api.yaml')
    )
  )
);

const { PORT } = process.env

app.listen(PORT, () => console.log(`Running at ${PORT}`))
