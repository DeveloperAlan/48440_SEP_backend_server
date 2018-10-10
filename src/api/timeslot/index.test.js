import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Timeslot } from '.'

const app = () => express(apiRoot, routes)

let timeslot

beforeEach(async () => {
  timeslot = await Timeslot.create({})
})

test('POST /timeslots 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, doctorId: 'test', time: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.doctorId).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.date).toEqual('test')
})

test('POST /timeslots 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /timeslots 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /timeslots 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /timeslots/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${timeslot.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeslot.id)
})

test('GET /timeslots/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${timeslot.id}`)
  expect(status).toBe(401)
})

test('GET /timeslots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /timeslots/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${timeslot.id}`)
    .send({ access_token: masterKey, doctorId: 'test', time: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeslot.id)
  expect(body.doctorId).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /timeslots/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${timeslot.id}`)
  expect(status).toBe(401)
})

test('PUT /timeslots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, doctorId: 'test', time: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /timeslots/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeslot.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /timeslots/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeslot.id}`)
  expect(status).toBe(401)
})

test('DELETE /timeslots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
