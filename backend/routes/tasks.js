
require('dotenv').config()
const express = require('express')
const router = express.Router()
const Task = require('../models/task')

//Get all
router.get('/', async (req, res) => {
    try {
        if(!req.session.userId){
            return res.sendStatus(404);
        }
        const tasks = await Task.find({
            userId:req.session.userId
        })
        if (tasks !== null) {
            res.status(200).json({tasks});
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/new', async (req, res) => {
    const task = new Task({
        taskName: req.body.taskName,
        taskLegalRepresentative: req.body.taskLegalRepresentative,
        taskObservations: req.body.taskObservations,
        userId: req.body.userId
    })
    try {
        const newTask = await task.save()
        res.json("Task created successfully!").sendStatus(201);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete one
router.delete('/:name', getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: "Task deleted" }).sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findOne(req.session.userId)
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