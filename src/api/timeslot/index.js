import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Timeslot, { schema } from './model'

const router = new Router()
const { doctorId, time, date } = schema.tree

/**
 * @api {post} /timeslots Create timeslot
 * @apiName CreateTimeslot
 * @apiGroup Timeslot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam doctorId Timeslot's doctorId.
 * @apiParam time Timeslot's time.
 * @apiParam date Timeslot's date.
 * @apiSuccess {Object} timeslot Timeslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeslot not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ doctorId, time, date }),
  create)

/**
 * @api {get} /timeslots Retrieve timeslots
 * @apiName RetrieveTimeslots
 * @apiGroup Timeslot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of timeslots.
 * @apiSuccess {Object[]} rows List of timeslots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /timeslots/:id Retrieve timeslot
 * @apiName RetrieveTimeslot
 * @apiGroup Timeslot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} timeslot Timeslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeslot not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /timeslots/:id Update timeslot
 * @apiName UpdateTimeslot
 * @apiGroup Timeslot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam doctorId Timeslot's doctorId.
 * @apiParam time Timeslot's time.
 * @apiParam date Timeslot's date.
 * @apiSuccess {Object} timeslot Timeslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeslot not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ doctorId, time, date }),
  update)

/**
 * @api {delete} /timeslots/:id Delete timeslot
 * @apiName DeleteTimeslot
 * @apiGroup Timeslot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Timeslot not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
