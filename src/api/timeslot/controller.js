import { success, notFound } from '../../services/response/'
import { Timeslot } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Timeslot.create(body)
    .then((timeslot) => timeslot.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Timeslot.count(query)
    .then(count => Timeslot.find(query, select, cursor)
      .then((timeslots) => ({
        count,
        rows: timeslots.map((timeslot) => timeslot.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Timeslot.findById(params.id)
    .then(notFound(res))
    .then((timeslot) => timeslot ? timeslot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Timeslot.findById(params.id)
    .then(notFound(res))
    .then((timeslot) => timeslot ? Object.assign(timeslot, body).save() : null)
    .then((timeslot) => timeslot ? timeslot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Timeslot.findById(params.id)
    .then(notFound(res))
    .then((timeslot) => timeslot ? timeslot.remove() : null)
    .then(success(res, 204))
    .catch(next)
