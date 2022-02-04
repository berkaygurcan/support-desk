const path = require('path');
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




// Routes
app.use('/api/users', require('./routes/userRoutes')); //route oluşturma
app.use('/api/tickets', require('./routes/ticketRoutes')); 

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));//static folder oluşturduk
    app.get('*', (req, res) => res.sendFile(__dirname, '../','frontend',
    'build','index.html'));
} else {

    //Route oluşturma
    app.get('/',(req,res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'}); //json döndürürüz
})
    
}

app.use(errorHandler) //passing middleware

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//bu portu dinler
