const express = require('express');
const router = express.Router();

const passport = require('passport');


router.get('/signup',(req,res) => {
    res.render('auth/signup');
});

// router.post('/signup', (req,res) => {
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureflash: true
//     });
//     res.send('received');
// });

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureflash: true
}));

router.get('/signin',(req,res) => {
    res.render('auth/signin');
})

router.post('/signin', (req,res,next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
})


router.get('/profile', (req,res) => {
    res.render('profile');
});

module.exports = router;