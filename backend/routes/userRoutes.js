const express = require('express');
const router=express.Router();
const user = require('../controllers/userController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/user',user.createUser);
//get all user
router.get('/user',user.getAllUser);
//update user
router.put('/user/:userID',user.updateUser);
//delete user
router.delete('/user/:userID',user.deleteUser);
// create login
router.post('/login',user.login);
router.post('/admin',validateToken,admin.adminDashboard);
//multiple middleware
router.get('/endpoint', requireRoles(['admin','super user']), (req, res) => {
    res.json({message: 'Shared Point'});
});
module.exports=router;
