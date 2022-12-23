import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import GoogleStrategy from 'passport-google-oauth2'
import FacebookStrategy from 'passport-facebook'
import { secret, apiURL, serverURL, googleClient, googleSecret, facebookAppId, facebookSecret } from './keys.js'
import User from '../models/User.js'

passport.use('jwt', new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, (jwtPayload, cb) => {
    return User.findOne({ _id: jwtPayload._id })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
))

passport.use('google', new GoogleStrategy({
    clientID: googleClient,
    clientSecret: googleSecret,
    callbackURL: `${serverURL}/${apiURL}`
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.email })
        .then(user => {
            const name = profile.displayName.split(' ');
            if (!user) {
                let newUser = new User({
                    provider: 'google',
                    socialID: profile.id,
                    email: profile.email,
                    name: name[0] + ' ' + name[1],
                    image: profile.picture,
                    password: null
                });

                newUser.save();
                jwt.sign(JSON.stringify(newUser._doc),
                    secret, {}, (err, token) => {
                        if (err) throw err;
                        return done(null, { user: newUser._doc, token });
                    }
                );
            } else {
                jwt.sign(JSON.stringify(user),
                    secret, {}, (err, token) => {
                        if (err) throw err;
                        return done(null, { user, token });
                    }
                );
            }
        })
        .catch(err => {
            return done(err, false);
        });
}
));

passport.use('facebook', new FacebookStrategy(
        {
            clientID: facebookAppId,
            clientSecret: facebookSecret,
            callbackURL: `${serverURL}/auth/facebook/callback`,
            profileFields: [
                'id',
                'displayName',
                'name',
                'emails',
                'picture.type(large)'
            ]
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ facebookId: profile.id })
                .then(user => {
                    if (!user) {
                        const newUser = new User({
                            provider: 'facebook',
                            socialID: profile.id,
                            email: profile.emails ? profile.emails[0].value : null,
                            name: profile.name.givenName + profile.name.familyName,
                            image: profile.photos[0].value,
                            password: null
                        });
        
                        newUser.save();
                        jwt.sign(JSON.stringify(newUser._doc),
                            secret, {}, (err, token) => {
                                if (err) throw err;
                                return done(null, { user: newUser._doc, token });
                            }
                        );
                    } else {
                        jwt.sign(JSON.stringify(user),
                            secret, {}, (err, token) => {
                                if (err) throw err;
                                return done(null, { user, token });
                            }
                        );
                    }
                })
                .catch(err => {
                    return done(err, false);
                });
        }
    )
);

export default async (app) => {
    app
        .use(passport.initialize())
        .get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
        .get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }),
            (_, res) => res.status(200).json(res.req.user))

        .get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'], session: false }))
        .get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', session: false }),
            (_, res) => res.status(200).json(res.req.user))
}