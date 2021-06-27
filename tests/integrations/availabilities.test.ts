import dotenv from 'dotenv'
import supertest from 'supertest'
import { MongoClient } from 'mongodb'

dotenv.config()

const {
  PORT,
  MONGO_URL = 'mongodb://root:root@127.0.0.1:27017',
  MONGO_DATABASE_NAME
} = process.env

const request = supertest(`http://localhost:${PORT}/api`)

describe('Testing the availability routers (/api/availabilities*)', () => {
  afterEach(async () => {
    const client = new MongoClient(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await client.connect();
    const database = client.db(MONGO_DATABASE_NAME)

    await database.collection('availabilities').deleteMany({})
    await client.close();
  })

  describe('POST /api/availabilities', () => {
    test('Should create an availability', async () => {
      await request
        .post('/availabilities')
        .send({
          professional: 'Scrooge Mcduck',
          startDate: '2021-06-26',
          startTime: '12:00',
          endDate: '2021-06-26',
          endTime: '15:20'
        })
        .set('Accept', 'application/json')
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              professional: 'Scrooge Mcduck',
              startDate: '2021-06-26',
              startTime: '12:00',
              endDate: '2021-06-26',
              endTime: '15:20',
              slots: [
                {
                  startDate: '2021-06-26',
                  startTime: '12:00'
                },
                {
                  startDate: '2021-06-26',
                  startTime: '12:30'
                },
                {
                  startDate: '2021-06-26',
                  startTime: '13:00'
                },
                {
                  startDate: '2021-06-26',
                  startTime: '13:30'
                },
                {
                  startDate: '2021-06-26',
                  startTime: '14:00'
                },
                {
                  startDate: '2021-06-26',
                  startTime: '14:30'
                }
              ]
            }
          )
        )
      })
    })
  })
})
