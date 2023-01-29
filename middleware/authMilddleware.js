// import passport from 'passport'
import { secret } from '../config/keys.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// export const auth = passport.authenticate('jwt', { session: false })
// export const auth = (req, res, next)=>next()

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error: 'You are not allowed to make this request.'});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, secret, (err, payload)=>{
        if(err){
            return res.status(401).json({error: 'You are not allowed to make this request.'});
        }
        const { _id } = payload;
        User.findById(_id)
        .then(userdata => { 
            req.user = userdata;
            req.user_id = _id;
            next()
        })
    });
}

export const role = (req, res, next) => {
    if (!req.user) return res.status(401).send('Unauthorized')
    const hasRole = ['USER', 'ADMIN', 'TRAINER'].find(role => req.user.role === role)
    if (!hasRole) return res.status(403).send('You are not allowed to make this request.')
    return next();
}

export const isAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).send('Unauthorized');
    if (req.user.role !== "ADMIN") return res.status(403).send('You are not allowed to make this request.');
    return next();
}