import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Appointments, { schema } from './model'

const router = new Router()
const { timeslotId, notes, userId } = schema.tree

/**
 * @api {post} /appointments Create appointments
 * @apiName CreateAppointments
 * @apiGroup Appointments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam timeslotId Appointments's timeslotId.
 * @apiParam notes Appointments's notes.
 * @apiParam userId Appointments's userId.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ timeslotId, notes, userId }),
  create)

/**
 * @api {get} /appointments Retrieve appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of appointments.
 * @apiSuccess {Object[]} rows List of appointments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /appointments/:id Retrieve appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /appointments/:id Update appointments
 * @apiName UpdateAppointments
 * @apiGroup Appointments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam timeslotId Appointments's timeslotId.
 * @apiParam notes Appointments's notes.
 * @apiParam userId Appointments's userId.
 * @apiSuccess {Object} appointments Appointments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointments not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ timeslotId, notes, userId }),
  update)

/**
 * @api {delete} /appointments/:id Delete appointments
 * @apiName DeleteAppointments
 * @apiGroup Appointments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Appointments not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
