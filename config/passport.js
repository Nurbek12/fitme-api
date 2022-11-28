import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { secret } from './keys.js'
import User from '../models/User.js'

passport.use('jwt', new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    }, (jwtPayload, cb) => {
        return User.findOne({_id: jwtPayload._id})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
))

export default (app) => {
    app.use(passport.initialize())
}