import mongoose, { Schema } from 'mongoose'

const appointmentsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: String
  },
  doctorId: {
    type: String
  },
  date: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  completed: {
    type: String
  },
  added: {
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
      user: this.user.view(full),
      patientId: this.patientId,
      doctorId: this.doctorId,
      date: this.date,
      description: this.description,
      location: this.location,
      completed: this.completed,
      added: this.added,
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
