import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Appointments } from '.'

const app = () => express(apiRoot, routes)

let appointments

beforeEach(async () => {
  appointments = await Appointments.create({})
})

test('POST /appointments 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, timeslotId: 'test', notes: 'test', userId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.timeslotId).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('POST /appointments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /appointments 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /appointments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /appointments/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${appointments.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointments.id)
})

test('GET /appointments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('GET /appointments/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /appointments/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${appointments.id}`)
    .send({ access_token: masterKey, timeslotId: 'test', notes: 'test', userId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointments.id)
  expect(body.timeslotId).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('PUT /appointments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('PUT /appointments/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, timeslotId: 'test', notes: 'test', userId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /appointments/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointments.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /appointments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointments.id}`)
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
