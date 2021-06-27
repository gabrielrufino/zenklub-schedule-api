import dayjs, { Dayjs } from 'dayjs'

const generateSlots = (startsAt: Dayjs, endsAt: Dayjs) => {
  if (!startsAt.isBefore(endsAt)) {
    throw new RangeError('startsAt must be before endsAt')
  }

  const slots = []

  let iterator = dayjs(startsAt)
  while (iterator.isBefore(endsAt.subtract(30, 'minute'))) {
    slots.push({
      startDate: iterator.format('YYYY-MM-DD'),
      startTime: iterator.format('HH:mm')
    })

    iterator = iterator.add(30, 'minute')
  }

  return slots
}

export default generateSlots
