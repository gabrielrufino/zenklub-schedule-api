import mongoose from 'mongoose'
import dotenv from 'dotenv'

export default async () => {
  dotenv.config()

  const {
    MONGO_URL = 'mongodb://localhost:27017/zenklub_schedule',
    MONGO_DATABASE_NAME = 'zenklub_schedule'
  } = process.env

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: MONGO_DATABASE_NAME
  })
}
