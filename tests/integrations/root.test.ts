import supertest from 'supertest'

const request = supertest('http://localhost:5000/api')

describe('Testing the root router (/api)', () => {
  test('Should return status code 200', async () => {
    await request
      .get('/')
      .expect(200)
  })

  test('Should return the correct body', async () => {
    await request
      .get('/')
      .set('Accept', 'application/json')
      .then(({ body }) => {
        expect(body).toEqual({ healthcheck: true })
      })
  })
})
