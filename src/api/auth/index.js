import { Router } from 'express'
import { login } from './controller'
import { master } from '../../services/passport'
import utsLogin from '../../services/uts'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission master
* @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/',
  utsLogin)

export default router
