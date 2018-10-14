import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import Doctor, { schema } from '../../api/doctor/model'

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, doctor, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !doctor) {
      return res.status(401).end()
    }
    req.logIn(doctor, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = Doctor.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, doctor, info) => {
    if (err || (required && !doctor) || (required && !~roles.indexOf(doctor.role))) {
      return res.status(401).end()
    }
    req.logIn(doctor, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy((email, password, done) => {
  const doctorSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

  doctorSchema.validate({ email, password }, (err) => {
    if (err) done(err)
  })

  Doctor.findOne({ email }).then((doctor) => {
    if (!doctor) {
      done(true)
      return null
    }
    return doctor.authenticate(password, doctor.password).then((doctor) => {
      done(null, doctor)
      return null
    }).catch(done)
  })
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  Doctor.findById(id).then((doctor) => {
    done(null, doctor)
    return null
  }).catch(done)
}))
