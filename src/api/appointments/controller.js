import { success, notFound } from '../../services/response/'
import { Appointments } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Appointments.create(body)
    .then((appointments) => appointments.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Appointments.count(query)
    .then(count => Appointments.find(query, select, cursor)
      .then((appointments) => ({
        count,
        rows: appointments.map((appointments) => appointments.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Appointments.findById(params.id)
    .then(notFound(res))
    .then((appointments) => appointments ? appointments.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Appointments.findById(params.id)
    .then(notFound(res))
    .then((appointments) => appointments ? Object.assign(appointments, body).save() : null)
    .then((appointments) => appointments ? appointments.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Appointments.findById(params.id)
    .then(notFound(res))
    .then((appointments) => appointments ? appointments.remove() : null)
    .then(success(res, 204))
    .catch(next)
