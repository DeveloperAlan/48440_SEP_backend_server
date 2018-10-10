/*
Logs in into UTS login system through REST API and gives
a success or failure token
*/

import request from 'request'

const UTS_LOGIN_URL = 'https://mytimetable.uts.edu.au/aplus2018/rest/student/login'

const utsLogin = (studentId, password) => {
  request.post(UTS_LOGIN_URL, {
    username: studentId,
    password: password
  }, function (err, httpResponse, body) {
    if (err) {
      return console.error(err)
    }
    console.log(body)
  })
}

export default utsLogin
