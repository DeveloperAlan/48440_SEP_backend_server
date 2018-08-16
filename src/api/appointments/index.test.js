import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Appointments } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, appointments

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  appointments = await Appointments.create({ user })
})

test('POST /appointments 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, patientId: 'test', doctorId: 'test', date: 'test', description: 'test', location: 'test', completed: 'test', added: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.patientId).toEqual('test')
  expect(body.doctorId).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.completed).toEqual('test')
  expect(body.added).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /appointments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /appointments 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /appointments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${appointments.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointments.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /appointments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('GET /appointments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /appointments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${appointments.id}`)
    .send({ access_token: userSession, patientId: 'test', doctorId: 'test', date: 'test', description: 'test', location: 'test', completed: 'test', added: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointments.id)
  expect(body.patientId).toEqual('test')
  expect(body.doctorId).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.completed).toEqual('test')
  expect(body.added).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /appointments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${appointments.id}`)
    .send({ access_token: anotherSession, patientId: 'test', doctorId: 'test', date: 'test', description: 'test', location: 'test', completed: 'test', added: 'test' })
  expect(status).toBe(401)
})

test('PUT /appointments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('PUT /appointments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, patientId: 'test', doctorId: 'test', date: 'test', description: 'test', location: 'test', completed: 'test', added: 'test' })
  expect(status).toBe(404)
})

test('DELETE /appointments/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointments.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /appointments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointments.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
