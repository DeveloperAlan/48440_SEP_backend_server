import { Appointments } from '.'

let appointments

beforeEach(async () => {
  appointments = await Appointments.create({ timeslotId: 'test', notes: 'test', userId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = appointments.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointments.id)
    expect(view.timeslotId).toBe(appointments.timeslotId)
    expect(view.notes).toBe(appointments.notes)
    expect(view.userId).toBe(appointments.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = appointments.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointments.id)
    expect(view.timeslotId).toBe(appointments.timeslotId)
    expect(view.notes).toBe(appointments.notes)
    expect(view.userId).toBe(appointments.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
