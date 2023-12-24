const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connectDb')


dotenv.config()

connectDB();

const app = express();
const PORT = process.env.PORT || 5000


app.listen(PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`)
})