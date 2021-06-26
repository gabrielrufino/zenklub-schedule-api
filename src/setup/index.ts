import mongoose from 'mongoose'
import dotenv from 'dotenv'

export default async () => {
  dotenv.config()

  const { MONGO_URL = 'mongodb://localhost:27017/zenklub_schedule' } = process.env

  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
