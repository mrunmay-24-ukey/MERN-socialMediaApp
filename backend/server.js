const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connectDb')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

dotenv.config()

connectDB();

const app = express();
const PORT = process.env.PORT || 5000

//* importing middlewares
app.use(express.json()) // to parse data form the req.body
app.use(express.urlencoded({extended:true})); //to parse from data in the req.body
app.use(cookieParser())


//* Routes
app.use('/api/users' , userRoutes)
app.use('/api/posts' , postRoutes)


app.listen(PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`)
})