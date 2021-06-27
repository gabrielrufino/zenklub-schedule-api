import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default async () => {
  dotenv.config()

  const {
    MONGO_URL = 'mongodb://localhost:27017/zenklub_schedule',
    MONGO_DATABASE_NAME = 'zenklub_schedule'
  } = process.env

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('America/Sao_Paulo')

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: MONGO_DATABASE_NAME
  })
}
