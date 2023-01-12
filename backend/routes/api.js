
const authRoute = require('./auth');
const userRoute = require('./users');

const adminRoute = require('./admin');

const router = require('express').Router();
const isLoggedIn = require('../app/middleware/isLoggedIn');
const isAdmin = require('../app/middleware/isAdmin');

const sliderRoute = require('./slider');
const aboutRoute = require('./about');
const categoryRoute = require('./category');
const productRoute = require('./product');
const cartRoute = require('./cart');
const userDetailRoute = require('./user-detail');

const subscribeRoute = require('./subscribe');

// middleware permission

router.use('/user',userRoute);
router.use('/auth',authRoute);

router.use('/admin',[isLoggedIn, isAdmin] , adminRoute);
router.use('/slider',[isLoggedIn, isAdmin] , sliderRoute);
router.use('/about',[isLoggedIn, isAdmin] , aboutRoute);
router.use('/category',[isLoggedIn,isAdmin], categoryRoute);
router.use('/product',[isLoggedIn,isAdmin], productRoute);
router.use('/user-detail',[isLoggedIn,isAdmin], userDetailRoute);
router.use('/cart',[isLoggedIn,isAdmin], cartRoute);
router.use('/user', userRoute);

router.use('/subscriber',subscribeRoute);

module.exports = router;