require('dotenv').config()
const express = require('express')
const router = express.Router()
const Document = require('../models/document')
const user = require('../models/user')
const nodemailer = require('nodemailer');
const credentials = require('../config')
// const { Document } = require('mongoose')

//Get all
router.post('/fetch', async (req, res) => {
    try {
        if(req.body.email==null){
            throw new Error("Must be logged in!")
        }
        const email = req.body.email;
        const docs = await Document.find({email:email})
        res.json(docs)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/', async (req, res) => {
    const doc = new Document({
        name: req.body.name,
        author: req.body.author,
        dateUploaded: req.body.dateUploaded,
        email:req.body.email
    })
    // console.log(req.body)
    try {
        const newDoc = await doc.save()
        res.status(201).json(newDoc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete one
router.delete('/:name', getDoc, async (req, res) => {
    try {
        await res.doc.remove()
        res.json({ message: "Document deleted" })
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