import express from 'express'
import dotenv from 'dotenv'

import router from './routers';

dotenv.config()

const app = express()

app.use(router)

const { PORT } = process.env

app.listen(PORT, () => console.log(`Running at ${PORT}`))
