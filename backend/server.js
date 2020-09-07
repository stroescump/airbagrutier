require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const credentials = require('./config');
const User = require('./models/user');
const user = require('./models/user');
const multer = require('multer');
const cookieParser = require('cookie-parser')
const path = require('path');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

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

app.use(cors({
    // credentials:true,
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
  });

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


const sessionStore = new MongoStore({
    mongooseConnection: db,
    collection: 'sessions'
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'application/pdf' ||
        file.mimetype == 'application/msword' ||
        file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype == 'application/vnd.ms-excel' ||
        file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype == 'application/zip') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(session({
    name: "airbag",
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}
))

const documentsRouter = require('./routes/documents')
const tasksRouter = require('./routes/tasks')

app.use('/documents', documentsRouter)
app.use('/tasks', tasksRouter)

app.get('/',(req,res)=>{
    res.redirect('/createSession')
})

app.get('/createSession', async(req, res) => {
    try {
        if (!req.session.userId) {
           res.status(404).send();
        } else {
            const user = await User.findById(req.session.userId);
            if(user!==null){                
                res.status(200).json({
                    isLogged:true,
                    name:user.name,
                    email:user.email
                })                
            }
        }
    } catch (error) {
        console.log(error);
    }
})

//Get all
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Login TOTP
app.post('/login', async (req, res) => {
    var totp = require('deathmoon-totp-generator');
    try {
        const user = await User.findOne({
            email:req.body.email
        })
        var token = totp('3adf4bbafdd5eaaca21d446ce8b7d45a7ad638ea5b294cff135dccea896426', { time: new Date() });
        var content = `Va rugam sa va autentificati folosind acest cod: ` + token;
        user.token=token
        const updatedUser = await user.save()
        console.log(updatedUser)

        var mail = {
            from: 'office@thevide.ro',
            to: req.body.email,
            subject: `Cod de autentificare AIRBAG RUTIER`,
            text: content
        }

        await transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(mail);
                console.log(err);
                res.json({ message: 'MESSAGE FAILED!' });
            } else {
                res.json({ message: 'Mesaj trimis cu succes.' });
            }
        })
    } catch (err) {
        console.log(err);
    }
})


app.post('/verify-login', async (req, res, next) => {
    try {
        const userToBeLogged = await User.findOne({
            email: req.body.email
        });
        if (userToBeLogged != null) {
            const name = userToBeLogged.name;
            const userId = userToBeLogged._id;
            if (req.body.token == userToBeLogged.token) {
                req.session.userId = userToBeLogged._id
                console.log(req.session.userId)
                res.json({name:name}).status(200).send();
            } else {
                res.status(400).json(message = "Token invalid");
            }
        }
    } catch (err) {
        console.log(err)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/')
        }
        res.status(200)
        res.clearCookie("airbag")
        res.redirect('/login')
    })
})

//Update one
app.patch('/users/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    if (req.body.phone != null) {
        res.user.phone = req.body.phone
    }

    if (req.body.email != null) {
        res.user.email = req.body.email
    }

    if (req.body.token != null) {
        res.user.token = req.body.token
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

app.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "Deleted subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Cannot find subscriber!" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

//Create one
app.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        token: req.body.token
    })
    try {
        const newUser = await user.save()
        if (newUser != null) {
            res.status(201).json("Inregistrat cu succes!")
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
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

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/users/login')
    }
    next();
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/incarca-documente', upload.single('file'), redirectLogin, (req, res) => {
    const payload = req.payload;
    res.json({ payload })
})
app.listen(process.env.PORT)

exports.redirectLogin = redirectLogin