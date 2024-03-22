import express from 'express'
import mongoose from 'mongoose'
import Employee from './models/Employee.js'
const app = express()

await mongoose.connect('mongodb://127.0.0.1:27017/company')
const port = 3000
app.set('view engine', 'ejs')


const names = ["Anas", "Ali", "Ahsan"]
const languages = ["PY", "JS", "Java"]
const cities = ["Karachi", "Lahore", "Islamabad"]

const getValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

app.get('/', (req, res) => {
    Employee.create({
        name: getValue(names),
        salary: Math.ceil(Math.random() * 500000),
        language: getValue(languages),
        city: getValue(cities),
        isManager: Math.random() > 0.5 ? true : false
    })
    res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})