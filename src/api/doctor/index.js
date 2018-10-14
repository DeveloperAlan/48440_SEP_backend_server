import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport/doctor_index.js'
import { index, showMe, show, create, update, updatePassword, destroy } from './controller'
import { schema } from './model'
export Doctor, { schema } from './model'

const router = new Router()
const { email, password, name, picture, role } = schema.tree

/**
 * @api {get} /doctors Retrieve doctors
 * @apiName Retrievedoctors
 * @apiGroup Doctor
 * @apiPermission admin
 * @apiParam {String} access_token Doctor access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} doctors List of doctors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /doctors/me Retrieve current Doctor
 * @apiName RetrieveCurrentDoctor
 * @apiGroup Doctor
 * @apiPermission Doctor
 * @apiParam {String} access_token Doctor access_token.
 * @apiSuccess {Object} Doctor Doctor's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /doctors/:id Retrieve Doctor
 * @apiName RetrieveDoctor
 * @apiGroup Doctor
 * @apiPermission public
 * @apiSuccess {Object} Doctor Doctor's data.
 * @apiError 404 Doctor not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /doctors Create Doctor
 * @apiName CreateDoctor
 * @apiGroup Doctor
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email Doctor's email.
 * @apiParam {String{6..}} password Doctor's password.
 * @apiParam {String} [name] Doctor's name.
 * @apiParam {String} [picture] Doctor's picture.
 * @apiParam {String=Doctor,admin} [role=Doctor] Doctor's role.
 * @apiSuccess (Sucess 201) {Object} Doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  body({ email, password, name, picture, role }),
  create)

/**
 * @api {put} /doctors/:id Update Doctor
 * @apiName UpdateDoctor
 * @apiGroup Doctor
 * @apiPermission Doctor
 * @apiParam {String} access_token Doctor access_token.
 * @apiParam {String} [name] Doctor's name.
 * @apiParam {String} [picture] Doctor's picture.
 * @apiSuccess {Object} Doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Doctor or admin access only.
 * @apiError 404 Doctor not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture }),
  update)

/**
 * @api {put} /doctors/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup Doctor
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password Doctor's new password.
 * @apiSuccess (Success 201) {Object} Doctor Doctor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Doctor access only.
 * @apiError 404 Doctor not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /doctors/:id Delete Doctor
 * @apiName DeleteDoctor
 * @apiGroup Doctor
 * @apiPermission admin
 * @apiParam {String} access_token Doctor access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Doctor not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
