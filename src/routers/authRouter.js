const express = require('express')
const passport = require('passport')
const authRouter = express.Router()

authRouter.route('/signIn')
.get((req, res)=>{
    res.render('auth/signIn')
})
.post(
    passport.authenticate('local',{
        successRedirect: '/auth/profile',
        failureRedirect:'/'
    })
)

authRouter.route('/signUp')
.get((req, res)=>{
    res.render('auth/signUp')
})
.post((req, res)=>{
    res.json(req.body)
})

authRouter.route('/profile').get( (req, res) =>{
    res.json(req.user)
})
module.exports = authRouter
