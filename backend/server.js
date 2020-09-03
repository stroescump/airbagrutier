require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const credentials = require('./config');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload')

let transport = {
    host: 'mail.thevide.ro',
    port: 465,
    auth: {
        user: credentials.USER,
        pass: credentials.PASS
    }
}

// let transporter = nodemailer.createTransport(transport)

// transporter.verify((err, succes) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Server is ready to recieve messages!');
//     }
// })

app.use(cors());
app.use(express.json());
app.use(fileUpload())
const users = []

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/sendMessage', async (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var content = `Nume: ${name} \n Email: ${email} \n Mesaj: ${message}`

    var mail = {
        from: name,
        to: 'office@thevide.ro',
        subject: `New message from ${name}`,
        text: content
    }

    await transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(mail);
            console.log(err);
            res.json({ message: 'MESSAGE FAILED!' });
        } else {
            res.json({ message: 'SUCCESS!' });
        }
    })
})

app.post('/verify-login', async (req, res, next) => {
    try {
        const userToBeLogged = await User.findOne({
            email: req.body.email
        });
        if (userToBeLogged != null) {
            if (req.body.token === userToBeLogged.token) {
                res.json(message = "Autentificat cu succes").status(200);
            } else {
                res.json(message = "Token invalid").status(400);
            }
        }
    } catch (err) {
        console.log(err)
    }
})

app.post('/incarca-documente', (req, res) => {
    console.log(req.files)
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json("Aia e coimiu, na mers")
    }

    let sampleFile = req.files.sampleFile;
    console.log(process.env.FILEUPLOAD_LOCATION2)
    sampleFile.mv(process.env.FILEUPLOAD_LOCATION2,(err)=>{
        if(err){
            return res.status(500).send(err);
        }
        res.send('File uploaded!')
    })
})
app.listen(process.env.PORT || '3000')