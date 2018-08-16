import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Appointments } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Appointments.create({ ...body, user })
    .then((appointments) => appointments.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Appointments.count(query)
    .then(count => Appointments.find(query, select, cursor)
      .populate('user')
      .then((appointments) => ({
        count,
        rows: appointments.map((appointments) => appointments.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Appointments.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((appointments) => appointments ? appointments.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Appointments.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((appointments) => appointments ? Object.assign(appointments, body).save() : null)
    .then((appointments) => appointments ? appointments.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Appointments.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((appointments) => appointments ? appointments.remove() : null)
    .then(success(res, 204))
    .catch(next)
