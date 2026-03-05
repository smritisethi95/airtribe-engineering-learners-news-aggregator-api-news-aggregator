const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth.controller')

//initial route for testing
router.get('/', (req, res) => {
    console.log('working fine', req.body, res.body);
});

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;