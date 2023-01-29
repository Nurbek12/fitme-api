import fs from 'fs'
import url from "url"
import path from 'path'
import jwt from 'jsonwebtoken'

import passport from 'passport'
import AppleStrategy from 'passport-apple'
import FacebookStrategy from 'passport-facebook'
import { Strategy, ExtractJwt } from 'passport-jwt'
import GoogleStrategy from 'passport-google-oauth2'

import { secret, googleClient, googleSecret, facebookAppId, facebookSecret, appleClient, appleKey, appleTeam } from './keys.js'

import User from '../models/User.js'


const dirname = url.fileURLToPath(new URL('.', import.meta.url));

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
    callbackURL: `http://localhost:3800/auth/google/callback`
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.email })
            .then(user => {
                const uname = profile.displayName.split(' ');
                if (!user) {
                    let newUser = new User({
                        provider: 'google',
                        socialID: profile.id,
                        email: profile.email,
                        name: uname[0] + ' ' + uname[1],
                        image: profile.picture,
                        password: null
                    });

                    newUser.save();
                    const { name, _id, email, phonenumber, pro_acc } = newUser;
                    
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
                        secret, {}, (err, token) => {
                            if (err) throw err;
                            return done(null, { user: newUser._doc, token });
                        }
                    );
                } else {
                    const { name, _id, email, phonenumber, pro_acc } = user;
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
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
        callbackURL: `http://localhost:3800/auth/facebook/callback`,
        profileFields: [
            'id',
            'displayName',
            'name',
            'emails',
            'picture.type(large)'
        ]
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ socialID: profile.id })
            .then(user => {
                if (!user) {
                    const newUser = new User({
                        provider: 'facebook',
                        socialID: profile.id,
                        email: profile.emails ? profile.emails[0].value : "",
                        name: profile.name.givenName + profile.name.familyName,
                        image: profile.photos[0].value,
                        password: null
                    });

                    newUser.save();
                    const { name, _id, email, phonenumber, pro_acc } = newUser;
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
                        secret, {}, (err, token) => {
                            if (err) throw err;
                            return done(null, { user: newUser._doc, token });
                        }
                    );
                } else {
                    const { name, _id, email, phonenumber, pro_acc } = user;
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
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

passport.use('apple', new AppleStrategy({
    clientID: appleClient,
    teamID: appleTeam,
    keyID: appleKey,
    key: fs.readFileSync(path.join(dirname, 'AuthKey_1234567890.p8')),
    callbackURL: 'http://localhost:3800/auth/apple/callback',
    scope: ['name', 'email']
    // clientID: "1321321",
    // teamID: "",
    // callbackURL: "",
    // keyID: "",
    // privateKeyLocation: "",
    // passReqToCallback: true
    }, function (req, accessToken, refreshToken, idToken, profile, cb) {
        User.findOne({ socialID: profile.id })
            .then(user => {
                console.log(profile);
                if (!user) {
                    const newUser = new User({
                        provider: 'apple',
                        socialID: profile.id,
                        email: profile.email,
                        name: profile.name.firstName + " " + profile.name.lastName,
                    });
                    
                    newUser.save();
                    const { name, _id, email, phonenumber, pro_acc } = newUser;
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
                        secret, {}, (err, token) => {
                            if (err) throw err;
                            return done(null, { user: newUser._doc, token });
                        }
                    );
                } else {
                    const { name, _id, email, phonenumber, pro_acc } = user;
                    jwt.sign(JSON.stringify({ name, _id, email, phonenumber, pro_acc }),
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
        cb(null, idToken);
    }
))

export default async app => 
    app.use(passport.initialize())

        .get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
        .get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }),
            (_, res) => res.status(200).json(res.req.user))

        .get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'], session: false }))
        .get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', session: false }),
            (_, res) => res.status(200).json(res.req.user))

        .get('/auth/apple', passport.authenticate('apple', { session: false }))
        .get('/auth/apple/callback', passport.authenticate('apple', { failureRedirect: '/', session: false }),
            (_, res) => res.status(200).json(res.req.user))