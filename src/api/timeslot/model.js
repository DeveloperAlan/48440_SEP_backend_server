import mongoose, { Schema } from 'mongoose'

const timeslotSchema = new Schema({
  doctorId: {
    type: String
  },
  time: {
    type: String
  },
  date: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

timeslotSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      doctorId: this.doctorId,
      time: this.time,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Timeslot', timeslotSchema)

export const schema = model.schema
export default model
