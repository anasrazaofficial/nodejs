require('dotenv').config()
require('./configs/database').connectWithDatabase()

const app = require('./app')
const cloudinary = require('cloudinary')
const { PORT, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT))