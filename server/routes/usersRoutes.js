const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const userSchema = require('../models/users');

// CRUD OPERATIONS

// GET ALL USERS

router.route('/').get((req, res, next) => {
    userSchema.find((err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

router.route("/getmail").get((req,res,next)=>{
    const mail = req.params.mail;
    console.log(mail)
    userSchema.find({mail:mail},(err,data)=>{
        // console.log(req.body)
        // console.log(req.body.mail)
        // console.log(data)
        if(err){
            return next(err)
        }else{
            console.log();
            return res.json(data)
        }
    })
})

module.exports = router