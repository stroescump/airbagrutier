require('dotenv').config()
const express = require('express')
const router = express.Router()
const Task = require('../models/task')

//Get all
router.get('/', async (req, res) => {
    try {
        if(req.body.email==null){
            throw new Error("Must be logged in!")
        }
        const email = req.body.email;
        const tasks = await Task.find({email:email})
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/', async (req, res) => {
    const task = new Task({
        taskName: req.body.taskName,
        taskLegalRepresentative: req.body.taskLegalRepresentative,
        taskObservations: req.body.taskObservations,
        email:req.body.email
    })
    // console.log(req.body)
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete one
router.delete('/:name', getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: "Task deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findOne(req.params.name)
        if (task == null) {
            return res.status(404).json({ message: "Cannot find task!" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.task = task
    next()
}

module.exports = router