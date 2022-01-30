const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser); //Controller kullanarak route dosyamızı temiz hale getirdik.
router.post('/login', loginUser);
router.get('/me', protect, getMe); // ikinci parametreye middleware ekledik 

module.exports = router ; //export common syntax