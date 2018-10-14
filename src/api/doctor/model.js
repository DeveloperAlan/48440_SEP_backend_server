import mongoose, { Schema } from 'mongoose'

const doctorSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  picture: {
    type: String
  },
  specialties: {
    type: String
  },
  qualifications: {
    type: String
  },
  rating: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

doctorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      picture: this.picture,
      specialties: this.specialties,
      qualifications: this.qualifications,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Doctor', doctorSchema)

export const schema = model.schema
export default model
