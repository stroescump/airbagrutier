require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const user = require('../models/user')
const nodemailer = require('nodemailer');
const credentials = require('../config')
const cors = require('cors')

router.use(cors())

let transport = {
    host: 'mail.thevide.ro',
    port: 465,
    auth: {
        user: credentials.USER,
        pass: credentials.PASS
    }
}

let transporter = nodemailer.createTransport(transport)

// transporter.verify((err, succes) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Server is ready to recieve messages!');
//     }
// })

//Get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Get one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})
//Create one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        token: req.body.token
    })
    // console.log(req.body)
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Login TOTP
router.post('/login', async (req, res) => {
    var totp = require('deathmoon-totp-generator');
    try {
        const user = await User.findOne({
            email:req.body.email
        })
        var token = totp('3adf4bbafdd5eaaca21d446ce8b7d45a7ad638ea5b294cff135dccea896426', { time: new Date() });
        var content = `Va rugam sa va autentificati folosind acest cod: ` + token;
        console.log(user)
        user.token=token
        const updatedUser = await user.save()
        console.log(updatedUser)

        var mail = {
            from: "office@thevide.ro",
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



//Update one
router.patch('/:id', getUser, async (req, res) => {
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
//Delete one
router.delete('/:id', getUser, async (req, res) => {
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

module.exports = router