import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Doctor, { schema } from './model'

const router = new Router()
const { email, password, name, picture, specialties, qualifications, rating } = schema.tree

/**
 * @api {post} /doctors Create doctor
 * @apiName CreateDoctor
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam email Doctor's email.
 * @apiParam password Doctor's password.
 * @apiParam name Doctor's name.
 * @apiParam picture Doctor's picture.
 * @apiParam specialties Doctor's specialties.
 * @apiParam qualifications Doctor's qualifications.
 * @apiParam rating Doctor's rating.
 * @apiSuccess {Object} doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Doctor not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ email, password, name, picture, specialties, qualifications, rating }),
  create)

/**
 * @api {get} /doctors Retrieve doctors
 * @apiName RetrieveDoctors
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of doctors.
 * @apiSuccess {Object[]} rows List of doctors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /doctors/:id Retrieve doctor
 * @apiName RetrieveDoctor
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Doctor not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /doctors/:id Update doctor
 * @apiName UpdateDoctor
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam email Doctor's email.
 * @apiParam password Doctor's password.
 * @apiParam name Doctor's name.
 * @apiParam picture Doctor's picture.
 * @apiParam specialties Doctor's specialties.
 * @apiParam qualifications Doctor's qualifications.
 * @apiParam rating Doctor's rating.
 * @apiSuccess {Object} doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Doctor not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ email, password, name, picture, specialties, qualifications, rating }),
  update)

/**
 * @api {delete} /doctors/:id Delete doctor
 * @apiName DeleteDoctor
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Doctor not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
