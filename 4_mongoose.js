import mongoose from "mongoose"
import express from "express"
import { Todo } from './models/Todo.js'

const connection = await mongoose.connect("mongodb://127.0.0.1:27017/todo")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const todo = new Todo({
        title: "Todo 1",
        desc: "Hey! this is todo",
        isDone: false
    })
    todo.save()
    res.send('Hello World!')
})

app.get('/get', async (req, res) => {
    let todo = await Todo.findOne({})
    res.send(todo)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// mongodb://localhost:27017/