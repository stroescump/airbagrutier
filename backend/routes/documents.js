require('dotenv').config()
const express = require('express')
const router = express.Router()
const Document = require('../models/document')
const jwt = require('jsonwebtoken');
const token_secret = process.env.TOKEN_SECRET
const User = require('../models/user')
const multer = require('multer');
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
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Get all
router.get('/fetch', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.sendStatus(403);
        } else {
            const userId = req.session.userId;
            const docs = await Document.find({ userId: userId })
            res.status(200).json({ docs });
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/new', upload.single('file'), async (req, res) => {
    if (!req.body.email || !req.file) {
        res.status(400).json("Must have email and file when uploading!")
    } else {
        const user = await User.findOne({ email: req.body.email })
        console.log(req.file+" EMAIL: "+req.body.email)
        const filePath = req.file.path.replace("\\", '/');
        const doc = new Document({
            name: req.body.name,
            author: req.body.author,
            dateUploaded: req.body.dateUploaded,
            userId: user._id,
            filePath: filePath
        })
        const newDoc = await doc.save()
        res.status(201).json(newDoc)
        // res.sendStatus(201);
    }
})

//Delete one
router.delete('/:name', getDoc, async (req, res) => {
    try {
        jwt.verify(req.cookies.token, token_secret, async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                await res.doc.remove()
                res.json({ message: "Document deleted" })
            }
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getDoc(req, res, next) {
    let doc;
    try {
        doc = await Document.findOne(req.params.name)
        if (doc == null) {
            return res.status(404).json({ message: "Cannot find document!" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.doc = doc
    next()
}

module.exports = router