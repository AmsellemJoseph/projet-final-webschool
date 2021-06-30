const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbUri = require('./database/dbUri').db;
const route = express.Router();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());

app.use('/registration', route);
const PORT = process.env.PORT || 2108;
const server = app.listen(PORT, () => {
    console.log("Connected to the port: " + PORT);
});

MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        console.log("Connecte a mongoDB");
        const db = client.db('projet-final');
        const users = db.collection('users')

        route.get("/allUsers", (req, res) => {
            db.collection("users").find().toArray()
                .then((result) => {
                    res.send(result)
                    return result;
                })
                .catch((err) => { console.log(err) })
        })

        route.post("/verifMail", (req, res) => {
            const mail = req.body.params.mailLower;
            db.collection("users").find({ mail: mail }).toArray()
                .then((result) => {
                    if (result.length) {
                        return res.send({ response: false })
                    }
                    return res.send({ response: true })
                })
                .catch((err) => { console.log(err) })
        })
        route.post("/verifUsername", (req, res) => {
            const username = req.body.params.usernameLower;
            db.collection("users").find({ username: username }).toArray()
                .then((result) => {
                    if (result.length) {
                        return res.send({ response: false })
                    }
                    return res.send({ response: true })
                })
                .catch((err) => { console.log(err) })
        })

        route.post("/createuser", (req, res) => {
            const newUser = req.body.params.newUser
            users.insertOne(newUser)
                .then((result) => {
                    res.send({ response: true })
                })
                .catch((err) => { res.send({ response: false }) })
        })

        route.get("/confirmregistration/", (req, res) => {
            const mail = req.query.mail;
            const query = { "mail": mail }
            const replacement = { $set: { "confirmed": true } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.redirect("http://localhost:3000");
        })

        route.post('/connection',(req,res)=>{
            const mail = req.body.params.user.mail;
            const password = req.body.params.user.password;
            db.collection("users").find({mail:mail}).toArray()
            .then((result)=>{
                console.log(result[0].password)
                console.log(password)
                if(result[0].password === password){
                    res.send({connection:true})
                }else{
                    res.send({connection:false})
                }
            })
            .catch((err)=>{ console.log(err) })
        })
    })


route.post("/mailing", (req, res) => {
    require('dotenv').config();
    const nodemailer = require('nodemailer');
    const hbs = require('nodemailer-express-handlebars')
    const mail = req.body.params.mail;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let transporter = nodemailer.createTransport({
        secure: false,
        port: 25,
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })
    transporter.use("compile", hbs({
        viewEngine: 'express-handlebars',
        viewPath: './'
    }))

    let mailOptions = {
        from: 'no-reply@Youhouhou.com',
        to: mail,
        subject: 'completing your registration',
        html: `<h1>CONGRATULATION!!</h1>
            <h3>Welcome to our amazing website!</h3>
            <p>Your almost there.</p>
            <p>To complete your registration</p> 
            <a href="http://localhost:2108/registration/confirmregistration?mail=${mail}">Click here!</a>
`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.error(err)
            return res.send({ response: false });
        } else {
            return res.send({ response: true });
        }
    })
})