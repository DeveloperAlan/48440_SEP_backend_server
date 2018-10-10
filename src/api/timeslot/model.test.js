import { Timeslot } from '.'

let timeslot

beforeEach(async () => {
  timeslot = await Timeslot.create({ doctorId: 'test', time: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = timeslot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeslot.id)
    expect(view.doctorId).toBe(timeslot.doctorId)
    expect(view.time).toBe(timeslot.time)
    expect(view.date).toBe(timeslot.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = timeslot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeslot.id)
    expect(view.doctorId).toBe(timeslot.doctorId)
    expect(view.time).toBe(timeslot.time)
    expect(view.date).toBe(timeslot.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
