import { Schema, model } from 'mongoose'

const availabilitySchema = new Schema({
  professional: {
    type: String,
    required: true,
    index: true
  },
  startsAt: {
    type: Date,
    required: true
  },
  endsAt: {
    type: Date,
    required: true
  },
  sessions: {
    type: Array,
    default: []
  }
})

const Availability = model('Availability', availabilitySchema)

export default Availability
