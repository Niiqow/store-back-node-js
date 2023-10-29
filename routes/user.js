const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Rutas relacionadas con usuarios
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserDetails);
router.put('/update', userController.updateUser);

module.exports = router;
