const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbUri = require('./database/dbUri').db;
const multer = require('multer')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());



const route = express.Router();
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
        route.post("/getuser", (req, res) => {
            const mail = req.body.params.mail;
            db.collection("users").find({ mail: mail }).toArray()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => { console.log(err) })
        })
        route.post("/getcredit", (req, res) => {
            const mail = req.body.params.mailCredit
            db.collection("users").find({ mail: mail }).toArray()
                .then((result) => {
                    res.send(result[0])
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

        route.post('/connection', (req, res) => {
            const mail = req.body.params.user.mail;
            const password = req.body.params.user.password;
            db.collection("users").find({ mail: mail }).toArray()
                .then((result) => {
                    if (result[0].password === password) {
                        res.send({ connection: true })
                    } else {
                        res.send({ connection: false })
                    }
                })
                .catch((err) => { console.log(err) })
        })

        route.post('/verifpending', (req, res) => {
            const mail = req.body.params.mail;
            db.collection("users").find({ mail: mail }).toArray()
                .then((result) => {
                    res.send({ confirmed: result[0].confirmed })
                })
                .catch((err) => { console.log(err) })
        })

        route.put('/majconnection', (req, res) => {
            const mail = req.body.params.mail
            const query = { mail: mail }
            const replacement = { $inc: { "nbrConnection": 1 }, $set: { "lastConnection": Date.now() } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.send(true)
        })

        route.put('/newnameimg', (req, res) => {
            const mail = req.body.params.mail.mail;
            const newName = req.body.params.newNameImg;
            const query = { mail: mail }
            const replacement = { $set: { "profilPic": newName } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.send(true)
        })

        route.put("/credits", (req, res) => {
            const mail = req.body.params.mail;
            const credit = req.body.params.mise;
            const query = { mail: mail }
            const replacement = { $inc: { "credit": -credit } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
        })
        route.put("/creditsplus", (req, res) => {
            const mail = req.body.params.mail;
            const gain = req.body.params.gain;
            const query = { mail: mail }
            const replacement = { $inc: { "credit": gain } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
        })

        route.post('/gettoken', (req, res) => {
            if (req.body.params.mail === null || req.body.params.tokenLocal === null) {
                return res.send(false)
            }
            const mail = req.body.params.mail.mail;
            const tokenLocal = req.body.params.tokenLocal;
            db.collection('users').find({ mail: mail }).toArray()
                .then((result) => {
                    if (result[0].token == tokenLocal) {
                        res.send(true)
                    } else {
                        res.send(false)
                    }
                })
                .catch((err) => { console.log(err) })
        })
        route.put('/settoken', (req, res) => {
            const token = req.body.params.token
            const mail = req.body.params.user.mail
            const query = { mail: mail }
            const replacement = { $set: { "token": token } }
            const options = { "returnNewDocument": false };
            db.collection('users').findOneAndUpdate(query, replacement, options);
            res.send(true)
        })
        route.put('/newpassword', (req, res) => {
            const mail = req.body.params.mail.mail
            const pass = req.body.params.pass
            const query = { mail: mail }
            const replacement = { $set: { "password": pass } }
            const options = { "returnNewDocument": false };
            db.collection('users').findOneAndUpdate(query, replacement, options);
            res.send(true)
        })

        route.put('/setcredits', (req, res) => {
            const mail = req.body.params.mail
            const credit = req.body.params.credit
            const query = { mail: mail }
            const replacement = { $inc: { "credit": credit } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options);
            res.send(true)
        })

        let nameImg = ""
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../public/uploads')
            },
            filename: function (req, file, cb) {
                nameImg = Date.now() + '-' + file.originalname
                cb(null, nameImg)
            }
        })

        var upload = multer({ storage: storage }).single('file')

        route.post('/img', (req, res) => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    // return res.status(500).json(err)
                    return res.send(false)
                } else if (err) {
                    // return res.status(500).json(err)
                    return res.send(false)
                }
                // return res.status(200).send(req.file)
                res.send({ nameImg: nameImg })
            })

        })

        route.post("/sendresulthorse", (req, res) => {
            const result = req.body.params.result;
            db.collection("horsesgames").insertOne(result)
                .then((result) => {
                    res.send(true)
                })
                .catch((err) => { console.log(err) })
        })
        route.post("/sendresultclick", (req, res) => {
            const result = req.body.params.result;
            db.collection("clickgames").insertOne(result)
                .then((result) => {
                    res.send(true)
                })
                .catch((err) => { console.log(err) })
        })
        route.post("/sendresultmore", (req, res) => {
            const result = req.body.params.result;
            db.collection("moreorlessgame").insertOne(result)
                .then((result) => {
                    res.send(true)
                })
                .catch((err) => { console.log(err) })
        })

        route.put("/incrgame", (req, res) => {
            const nameGame = req.body.params.nameGame;
            const query = { nameGame: nameGame }
            const replacement = { $inc: { nbrTotal: 1 } }
            const options = { "returnNewDocument": false };
            db.collection("nbrgamesplayed").findOneAndUpdate(query, replacement, options)
            res.send(true);
        })

        route.put("/addgameclick", (req, res) => {
            const mail = req.body.params.mail.mail
            const query = { mail: mail }
            const replacement = { $inc: { nbrClick: 1 } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.send(true)
        })
        route.put("/addgamerace", (req, res) => {
            const mail = req.body.params.mail.mail
            const query = { mail: mail }
            const replacement = { $inc: { nbrRace: 1 } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.send(true)
        })
        route.put("/addgamemoreorless", (req, res) => {
            const mail = req.body.params.mail.mail
            const query = { mail: mail }
            const replacement = { $inc: { nbrMoreOrLess: 1 } }
            const options = { "returnNewDocument": false };
            db.collection("users").findOneAndUpdate(query, replacement, options)
            res.send(true)
        })

        route.get("/getnbr", (req, res) => {
            const nameGame = req.query.nameGame
            db.collection("nbrgamesplayed").find().toArray()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => { console.log(err) })
        })

        route.get("/getwin", (req, res) => {
            const coll = req.query.coll
            db.collection(coll).find().sort({ "date": -1 }).limit(10).toArray()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => { console.log(err) })
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
        subject: 'Completing your registration',
        html: `<div style="background:#1a1e4d;text-align:center;color:#71f6ff;font-family:sans-serif;">
                <h1 style="color:#71f6ff;">CONGRATULATION!!</h1>
                <h3 style="color:#71f6ff;">Welcome to our amazing website!</h3>
                <p style="color:#71f6ff;">Your almost there.</p>
                 <p style="color:#71f6ff;">To complete your registration</p> 
                 <a style="color:#a035fd;" href="http://localhost:2108/registration/confirmregistration?mail=${mail}">Click here!</a>
             </div>`,
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


route.post("/sendmailreset", (req, res) => {
    require('dotenv').config();
    const nodemailer = require('nodemailer');
    const hbs = require('nodemailer-express-handlebars')
    const mail = req.body.params.mailLower;

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
        subject: 'Resetting your password',
        html: `<div style="background:#1a1e4d;text-align:center;color:#71f6ff;font-family:sans-serif;">
                <h1 style="color:#71f6ff;">Hi dear user!!</h1>
                <h3 style="color:#71f6ff;">You forgot your password and want to reset it?</h3>
                <p style="color:#71f6ff;">Alright.</p>
                <a style="color:#a035fd;" href="http://localhost:3000/resetpassword">Click here!</a>
                 <p style="color:red;">If you don't want to reset it or if you don't request it, dont mind of it.</p> 
             </div>`,
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
route.post("/mailingAdmin", (req, res) => {
    require('dotenv').config();
    const nodemailer = require('nodemailer');
    const hbs = require('nodemailer-express-handlebars')
    console.log(req.body.params)
    const mails = req.body.params.mails
    const title = req.body.params.title
    const text = req.body.params.text
    const mailsString = mails.toString()
    const textString = text.replaceAll('\n', '</h3><h3>')
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
        to: mailsString,
        subject: title,
        html: `<div style="background:#1a1e4d;text-align:center;color:#71f6ff;font-family:sans-serif;">
                <h3 style="color:#71f6ff;padding:30px;">${textString}</h3>
             </div>`,
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


// SQL

const mysql = require('mysql')

const dbMysql = mysql.createConnection({

    host: "localhost",

    user: "JoAms",

    password: "DT4nlhcQUwIJX2dA",

    database: "projet_final_webschool",

});
dbMysql.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Connected to MySql!!")


})


route.get('/getallsql', (req, res) => {

    dbMysql.query('SELECT * FROM todo_list', ((err, result) => {

        if (err) {
            throw err
        }
        res.send(result)
    }))
})

route.delete('/deletetodo', (req, res) => {
    const id = req.query.id
    dbMysql.query(`DELETE FROM todo_list WHERE id = "${id}"`, ((err, result) => {
        if (err) {
            throw err
        }
        res.send(true)
    }))
})

route.post('/sendtodo', (req, res) => {
    const title = req.body.params.title;
    const text = req.body.params.text;
    dbMysql.query(`INSERT INTO todo_list(title, text) VALUES ("${title}","${text}")`, ((err, result) => {
        if (err) {
            throw err
        }
        res.send(true)
    }))
})