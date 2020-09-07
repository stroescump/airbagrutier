require('dotenv').config()
const express = require('express')
const router = express.Router()
const Document = require('../models/document')
const jwt = require('jsonwebtoken');
const token_secret = process.env.TOKEN_SECRET
const User = require('../models/user')
const { redirectLogin } = require('../server')

//Get all
router.get('/fetch', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.sendStatus(403);
        } else {
            const userId = req.session.userId;
            const docs = await Document.find({userId:userId})
            res.json({docs}).sendStatus(200);
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/new', async (req, res) => {
    if (req.body === null) {
        res.status(400).json(new Error("Must have data when creating a new document!"))
    } else {
        const doc = new Document({
            name: req.body.name,
            author: req.body.author,
            dateUploaded: req.body.dateUploaded,
            userId: req.body.userId
        })
        const newDoc = await doc.save()
        res.status(201).json(newDoc)
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