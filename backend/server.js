const express = require('express'); //common module js 
const colors = require('colors'); 
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express(); //init app

app.use(express.json()) //middlewares
app.use(express.urlencoded({extended: false}))


//Route oluşturma
app.get('/',(req,res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'}); //json döndürürüz
})

// Routes
app.use('/api/users', require('./routes/userRoutes')); //route oluşturma

app.use(errorHandler) //passing middleware

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//bu portu dinler
