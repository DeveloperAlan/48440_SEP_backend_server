import { Doctor } from '.'

let doctor

beforeEach(async () => {
  doctor = await Doctor.create({ email: 'test', password: 'test', name: 'test', picture: 'test', specialties: 'test', qualifications: 'test', rating: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = doctor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(doctor.id)
    expect(view.email).toBe(doctor.email)
    expect(view.password).toBe(doctor.password)
    expect(view.name).toBe(doctor.name)
    expect(view.picture).toBe(doctor.picture)
    expect(view.specialties).toBe(doctor.specialties)
    expect(view.qualifications).toBe(doctor.qualifications)
    expect(view.rating).toBe(doctor.rating)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = doctor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(doctor.id)
    expect(view.email).toBe(doctor.email)
    expect(view.password).toBe(doctor.password)
    expect(view.name).toBe(doctor.name)
    expect(view.picture).toBe(doctor.picture)
    expect(view.specialties).toBe(doctor.specialties)
    expect(view.qualifications).toBe(doctor.qualifications)
    expect(view.rating).toBe(doctor.rating)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
