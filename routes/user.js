const express = require('express');
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const router = express.Router();


router.get('/', ensureGuest, (req, res, next) => {
    res.render('login');
});


router.get('/google',
    passport.authenticate('google', { scope: ['profile']}));


router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth' }),
    (req, res) => {
        const token = req.query.accessToken;
        console.log("Token: ", token);

        const googleAccessToken = req.user.accessToken;
        console.log("Google Access Token: ", googleAccessToken);

        res.cookie('token', token, {
            // Ajusta las opciones de la cookie según sea necesario
            maxAge: 3600000, // Tiempo de vida de la cookie en milisegundos (por ejemplo, 1 hora)
            httpOnly: true, // La cookie solo será accesible a través del protocolo HTTP
            // Puedes ajustar otras opciones de la cookie según tus necesidades
          });

        //res.redirect('/dashboard');
        res.redirect(`http://hotlinemiamitecii.me/CloudComputing/`);
    });


router.get('/logout',  (req, res, next) => {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;