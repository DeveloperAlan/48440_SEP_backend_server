import crypto from 'crypto'
import { Doctor } from '.'

let doctor

beforeEach(async () => {
  doctor = await Doctor.create({ name: 'doctor', email: 'a@a.com', password: '123456' })
})

describe('set email', () => {
  it('sets name automatically', () => {
    doctor.name = ''
    doctor.email = 'test@example.com'
    expect(doctor.name).toBe('test')
  })

  it('sets picture automatically', () => {
    const hash = crypto.createHash('md5').update(doctor.email).digest('hex')
    expect(doctor.picture).toBe(`https://gravatar.com/avatar/${hash}?d=identicon`)
  })

  it('changes picture when it is gravatar', () => {
    doctor.email = 'b@b.com'
    const hash = crypto.createHash('md5').update(doctor.email).digest('hex')
    expect(doctor.picture).toBe(`https://gravatar.com/avatar/${hash}?d=identicon`)
  })

  it('does not change picture when it is already set and is not gravatar', () => {
    doctor.picture = 'not_gravatar.jpg'
    doctor.email = 'c@c.com'
    expect(doctor.picture).toBe('not_gravatar.jpg')
  })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = doctor.view()
    expect(view).toBeDefined()
    expect(view.id).toBe(doctor.id)
    expect(view.name).toBe(doctor.name)
    expect(view.picture).toBe(doctor.picture)
  })

  it('returns full view', () => {
    const view = doctor.view(true)
    expect(view).toBeDefined()
    expect(view.id).toBe(doctor.id)
    expect(view.name).toBe(doctor.name)
    expect(view.email).toBe(doctor.email)
    expect(view.picture).toBe(doctor.picture)
    expect(view.createdAt).toEqual(doctor.createdAt)
  })
})

describe('authenticate', () => {
  it('returns the doctor when authentication succeed', async () => {
    expect(await doctor.authenticate('123456')).toBe(doctor)
  })

  it('returns false when authentication fails', async () => {
    expect(await doctor.authenticate('blah')).toBe(false)
  })
})
