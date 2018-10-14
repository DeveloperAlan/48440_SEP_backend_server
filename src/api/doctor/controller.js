import { success, notFound } from '../../services/response/'
import { Doctor } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Doctor.count(query)
    .then(count => Doctor.find(query, select, cursor)
      .then(doctors => ({
        rows: doctors.map((doctor) => doctor.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Doctor.findById(params.id)
    .then(notFound(res))
    .then((doctor) => doctor ? doctor.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ doctor }, res) =>
  res.json(doctor.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  Doctor.create(body)
    .then(doctor => {
      sign(doctor.id)
        .then((token) => ({ token, doctor: doctor.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Doctor.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other doctor\'s data'
        })
        return null
      }
      return result
    })
    .then((doctor) => doctor ? Object.assign(doctor, body).save() : null)
    .then((doctor) => doctor ? doctor.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  Doctor.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other doctor\'s password'
        })
        return null
      }
      return result
    })
    .then((doctor) => doctor ? doctor.set({ password: body.password }).save() : null)
    .then((doctor) => doctor ? doctor.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Doctor.findById(params.id)
    .then(notFound(res))
    .then((doctor) => doctor ? doctor.remove() : null)
    .then(success(res, 204))
    .catch(next)
