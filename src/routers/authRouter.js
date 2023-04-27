const express = require('express')
const authRouter = express.Router()

authRouter.route('/signIn')
.get((req, res)=>{
    res.render('auth/signIn')
})
.post((req, res)=>{
    res.json(req.body)
})

authRouter.route('/signUp')
.get((req, res)=>{
    res.render('auth/signUp')
})
.post((req, res)=>{
    res.json(req.body)
})


module.exports = authRouter
