const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbUri = require('./database/dbUri').db;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());

const PORT = process.env.PORT || 2108;
const server = app.listen(PORT,()=>{
    console.log("Connected to the port: "+PORT);
});

MongoClient.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((client)=>{
    console.log("Connecte a mongoDB");
    const db = client.db('projet-final');
    const users = db.collection('users')

    app.get("/allUsers",(req,res)=>{
        db.collection("users").find().toArray()
        .then((result)=>{
            res.send(result)
            return result;
        })
        .catch((err)=>{console.log(err)})
    })
    
    
    app.post("/createuser",(req,res)=>{
        const newUser = req.body.params.newUser
        console.log(newUser)
        users.insertOne(newUser)
        .then((result)=>{
            console.log("bien ajoute")
        })
        .catch((err)=>{console.log(err)})
    })
})