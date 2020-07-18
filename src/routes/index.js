const { Router } = require('express');
const router = Router();

const {getUsers, createUsers,deleteUsers,searchUsers,updateUsers} = require('../controllers/index.controllers')
router.get('/users',getUsers);
router.post('/users',createUsers);
router.delete('/users/:id',deleteUsers);
router.get('/users/:id',searchUsers);
router.put('/users/',updateUsers)

module.exports = router;