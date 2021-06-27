import dayjs from 'dayjs'

import generateSlots from '@helpers/generate-slots'

describe('Testing the helper generateSlots', () => {
  test('Should throw an error if receives startsAt after endsAt', () => {
    const startsAt = dayjs('2021-06-27')
    const endsAt = dayjs('2021-06-26')

    expect(() => {
      generateSlots(startsAt, endsAt)
    }).toThrowError(new RangeError('startsAt must be before endsAt'))
  })

  test('Should return the correct slots', () => {
    const startsAt = dayjs('2021-06-27 15:00')
    const endsAt = dayjs('2021-06-27 16:30')

    const slots = generateSlots(startsAt, endsAt)

    expect(slots).toEqual(
      [
        {
          startDate: '2021-06-27',
          startTime: '15:00'
        },
        {
          startDate: '2021-06-27',
          startTime: '15:30'
        }
      ]

    )
  })
})
