import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import Promise from 'bluebird'

export const login = ({ user }, res, next) => {
    console.log(user)
    sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
        .catch(next)

// export const login = (req, res, next) => {
//     console.log("logging in")
//     // console.log(req)
//     console.log(res)
//     // console.log(next)
//     Promise.promisify(success(res, 201))()
//         .catch(next)

}