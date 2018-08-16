import { Appointments } from '.'
import { User } from '../user'

let user, appointments

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  appointments = await Appointments.create({ user, patientId: 'test', doctorId: 'test', date: 'test', description: 'test', location: 'test', completed: 'test', added: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = appointments.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.patientId).toBe(appointments.patientId)
    expect(view.doctorId).toBe(appointments.doctorId)
    expect(view.date).toBe(appointments.date)
    expect(view.description).toBe(appointments.description)
    expect(view.location).toBe(appointments.location)
    expect(view.completed).toBe(appointments.completed)
    expect(view.added).toBe(appointments.added)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = appointments.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.patientId).toBe(appointments.patientId)
    expect(view.doctorId).toBe(appointments.doctorId)
    expect(view.date).toBe(appointments.date)
    expect(view.description).toBe(appointments.description)
    expect(view.location).toBe(appointments.location)
    expect(view.completed).toBe(appointments.completed)
    expect(view.added).toBe(appointments.added)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
