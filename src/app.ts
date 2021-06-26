import express from 'express'
import helmet from 'helmet'

import router from './routers'

const app = express()

app.use([
  helmet(),
  express.json()
])
app.use('/api', router)

const { PORT } = process.env

app.listen(PORT, () => console.log(`Running at ${PORT}`))
