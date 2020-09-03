require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const credentials = require('./config');
const User = require('./models/user');
const Document = require('./models/document');
const Task = require('./models/task');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const path = require('path');

let transport = {
    host: 'mail.thevide.ro',
    port: 465,
    auth: {
        user: credentials.USER,
        pass: credentials.PASS
    }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((err, succes) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is ready to recieve messages!');
    }
})

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
const users = []

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const usersRouter = require('./routes/users')
const documentsRouter = require('./routes/documents')
const tasksRouter = require('./routes/tasks')

app.use('/users', usersRouter)
app.use('/documents', documentsRouter)
app.use('/tasks', usersRouter)

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

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads');
    },
    filename: (req,file,cb) =>{
        console.log(file);
        cb(null,file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype =='image/jpeg' || 
    file.mimetype=='image/png' || 
    file.mimetype =='application/pdf' || 
    file.mimetype=='application/msword' || 
    file.mimetype=='application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype=='application/vnd.ms-excel' ||
    file.mimetype=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
    file.mimetype=='application/zip'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

app.post('/incarca-documente', upload.single('file'), (req, res) => {
    try{
        return res.sendStatus(201);
    }catch(err){
        console.log(err);
    }
})
app.listen(process.env.PORT || '3000')