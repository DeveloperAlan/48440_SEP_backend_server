// /*
// Logs in into UTS login system through REST API and gives
// a success or failure token
// */

import request from 'request-promise'
// import Promise from 'bluebird'
import { success, notFound, authorOrAdmin } from '../../services/response/'

const UTS_LOGIN_URL = 'https://mytimetable.uts.edu.au/aplus2018/rest/student/login'

const utsLogin = ({ body }, res, next) => {
    console.log("res is", res)
    console.log("posting")
    // console.log(next)
    // console.log(studentId)
    // console.log(header.body)


    const data =  {
      username: body.username,
      password: body.password
    }

  var options = {
      method: 'POST',
      uri: 'https://mytimetable.uts.edu.au/aplus2018/rest/student/login',
      form: data,
      json: true
  };

  request(options)
      .then(function(body) {
          console.log("the body is")
          console.log(res.body)
          success(res, 200)
      })
      .catch(next)

}

export default utsLogin