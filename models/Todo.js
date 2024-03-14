import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    isDone: Boolean
})

export const Todo = mongoose.model('Todos', TodoSchema)