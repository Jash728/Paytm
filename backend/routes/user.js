const express = require('express');
const { signUp, signIn, updateUser, getUserByFilter } = require('../controllers/user');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update', authMiddleware, updateUser)
router.get('/bulk', authMiddleware, getUserByFilter)

module.exports = router;
