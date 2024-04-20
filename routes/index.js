var express=require('express');
var router=express.Router();
var homeController=require('../controllers/home_controller')


console.log("home router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports = router;