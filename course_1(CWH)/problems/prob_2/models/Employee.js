import mongoose, { model } from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean
})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee