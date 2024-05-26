// NO PROBLEM HERE 

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const e = require('express');
const User = require('../models/User');


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
    },
        async function (accessToken, refreshToken, profile, done) {

            console.log("Trying to access google account: ", profile, " Token: ", accessToken, refreshToken);

            try {
                let user = await User.findOne({ id_google: profile.id });
                if (user) {
                    console.log("user is there: " + user);
                    done(null, user);
                } else {
                    // id: '104768025942449345057',
                    //   displayName: 'MD SHAYON',
                    //   name: { familyName: 'SHAYON', givenName: 'MD' },
                    //   photos: [
                    //     {
                    //       value: 'https://lh3.googleusercontent.com/a-/AOh14Gh6h7ztZMIeXTwDdSMmBVa87wxG0xggRbm-XWdiGw=s96-c'
                    //     }
                    //   ],

                    const newUser = {   // mistake
                        id_google: profile.id,
                        name: profile.displayName,
                        
                        image: profile.photos[0].value
                    };
                    user = await User.create(newUser);
                    console.log("creating new user: " + user);
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
            }

        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}