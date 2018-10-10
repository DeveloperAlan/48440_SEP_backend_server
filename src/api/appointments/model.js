import mongoose, { Schema } from 'mongoose'

const appointmentsSchema = new Schema({
  timeslotId: {
    type: String
  },
  notes: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

appointmentsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      timeslotId: this.timeslotId,
      notes: this.notes,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Appointments', appointmentsSchema)

export const schema = model.schema
export default model
