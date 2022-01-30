const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) { 
            //Bearer token ifadesi ile gönderilecek ondan bunu kontrol ediyoruz
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];//array ilk elemanı Bearer ikinci elemanı token değerimiz olur
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password'); //token içinde id değeri vardı password field değerini istemiyoruz.
                
                next();

            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Not authorized');
                
            }
        }

        if(!token) {
            res.status(401);
                throw new Error('Not authorized');
        }
    
})

module.exports = { protect };