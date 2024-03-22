//Select Database
use("mydb")





//Create
db.Courses.insertOne({ name: "Python", price: 6000, instructor: "Harry" })

db.Courses.insertMany([
    { name: "Java", price: 5500, instructor: "John" },
    { name: "JavaScript", price: 6500, instructor: "Emily" },
    { name: "C++", price: 6200, instructor: "Michael" },
    { name: "Ruby", price: 5800, instructor: "Sophia" },
    { name: "PHP", price: 5700, instructor: "David" }
])





//Read
db.Courses.find()
let a = db.Courses.find({ name: "Java" })
console.log(a.toArray());
console.log(a.count());

db.Courses.findOne()





//Update
db.Courses.updateOne({ name: "Java" }, { $set: { name: "Spring Boot" } })

db.Courses.updateMany({ name: "Python" }, { $set: { name: "PY" } })





//Delete
db.Courses.deleteOne({ name: 'PHP' })
db.Courses.deleteMany({ name: 'PY' })