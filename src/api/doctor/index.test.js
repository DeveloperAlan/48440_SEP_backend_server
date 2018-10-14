import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Doctor } from '.'

const app = () => express(apiRoot, routes)

let doctor

beforeEach(async () => {
  doctor = await Doctor.create({})
})

test('POST /doctors 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, email: 'test', password: 'test', name: 'test', picture: 'test', specialties: 'test', qualifications: 'test', rating: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.specialties).toEqual('test')
  expect(body.qualifications).toEqual('test')
  expect(body.rating).toEqual('test')
})

test('POST /doctors 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /doctors 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /doctors 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /doctors/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${doctor.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(doctor.id)
})

test('GET /doctors/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${doctor.id}`)
  expect(status).toBe(401)
})

test('GET /doctors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /doctors/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${doctor.id}`)
    .send({ access_token: masterKey, email: 'test', password: 'test', name: 'test', picture: 'test', specialties: 'test', qualifications: 'test', rating: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(doctor.id)
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.specialties).toEqual('test')
  expect(body.qualifications).toEqual('test')
  expect(body.rating).toEqual('test')
})

test('PUT /doctors/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${doctor.id}`)
  expect(status).toBe(401)
})

test('PUT /doctors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, email: 'test', password: 'test', name: 'test', picture: 'test', specialties: 'test', qualifications: 'test', rating: 'test' })
  expect(status).toBe(404)
})

test('DELETE /doctors/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${doctor.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /doctors/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${doctor.id}`)
  expect(status).toBe(401)
})

test('DELETE /doctors/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
