const router= require('express').Router()
const authCtrl= require("./auth.controller")
const uploader= require("../../middlewares/uploader.middleware")
const ValidateRequest= require("../../middlewares/validate-request.middleware")
const { registerSchema }= require("./auth.validator")
const {passwordSchema}= require("./auth.validator")

const dirSetup= (req, res, next)=>{
    req.uploadDir= "./public/uploads/users"
    next()
}


//Auth and Authorization routes start
router.post('/register', dirSetup, uploader.single("image"), ValidateRequest(registerSchema),authCtrl.register) //uploader.single ,uploader.array("Image", 5)
router.get('/verify-token/:token', authCtrl.verifytoken)
router.post('/set-password/:token',ValidateRequest(passwordSchema),authCtrl.setPassword)

router.post('/login', authCtrl.login)
router.post('/forget-password', authCtrl.forgotPassword)
router.get('/me',(req,res,next)=>{}, authCtrl.me)
router.post('/logout',(req,res,next)=>{}, authCtrl.logout)

module.exports= router;

