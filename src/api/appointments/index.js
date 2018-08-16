import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Appointments, { schema } from './model'

const router = new Router()
const { patientId, doctorId, date, description, location, completed, added } = schema.tree

/**
 * @api {post} /appointments Create appointments
 * @apiName CreateAppointments
 * @apiGroup Appointments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam patientId Appointments's patientId.
 * @apiParam doctorId Appointments's doctorId.
 * @apiParam date Appointments's date.
 * @apiParam description Appointments's description.
 * @apiParam location Appointments's location.
 * @apiParam completed Appointments's completed.
 * @apiParam added Appointments's added.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ patientId, doctorId, date, description, location, completed, added }),
  create)

/**
 * @api {get} /appointments Retrieve appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointments
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of appointments.
 * @apiSuccess {Object[]} rows List of appointments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /appointments/:id Retrieve appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /appointments/:id Update appointments
 * @apiName UpdateAppointments
 * @apiGroup Appointments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam patientId Appointments's patientId.
 * @apiParam doctorId Appointments's doctorId.
 * @apiParam date Appointments's date.
 * @apiParam description Appointments's description.
 * @apiParam location Appointments's location.
 * @apiParam completed Appointments's completed.
 * @apiParam added Appointments's added.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ patientId, doctorId, date, description, location, completed, added }),
  update)

/**
 * @api {delete} /appointments/:id Delete appointments
 * @apiName DeleteAppointments
 * @apiGroup Appointments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Appointments not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
