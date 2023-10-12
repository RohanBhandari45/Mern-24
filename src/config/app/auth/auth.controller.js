const dotenv= require("dotenv")
dotenv.config()

const {z}= require('zod')
const{generateRandomString}= require("../../helpers")

const mailSvc= require("../../services/mail.service")
const authSvc= require("../auth/auth.services")


class AuthController{
        register= async  (req,res,next)=>{
            try{
                let payload= req.body

                if(req.file){
                    payload.image= req.file.filename
                }else  if(req.files){
                    payload.image=req.files.map((item)=>item.filename);
                }

                

                // let validatedData = registerSchema.parse(payload) // this code is done for acceptable for validation

                //validate
                // if(!payload.name||payload.name === null || payload.name === "null"){
                //     next({code: 400, message: "Validation Failure", result:{name: "Name is required"}})
                // }
                // if(!payload.email||payload.email === null || payload.email === "null"){
                //     next({code: 400, message: "Validation Failure", result:{email: "Email is required"}})
                // } else if(payload.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                //     next({code: 400, message: "Validation Failure", result:{email: "Invalid Email Format"}})
                // }

// git add . 
// git commit -m "messa"
// git push orgin branch:branch
                //file
                let file= req.file

                //todo: DB store
                payload.status= "inactive"
                payload.token= generateRandomString()

                let mailMsg= authSvc.registerEmailMessage(payload.name, payload.token)
                const mailAck = await mailSvc.emailSend (
                    payload.email,
                    "Activate your Account",
                    mailMsg
                )
                console.log(mailAck)
                res.json({
                    result: payload,
                    // name: file
                })
            }catch(except){
                next(except) // next without a parameter s always a middleware
            }
        }
        verifytoken= (req,res,next)=>{
            try{
                let token= req.params.token;
               if(token){
                res.json({
                    result: {},
                    msg: "Valid Token",
                    meta: null
                })
               }else{
              next({code:400, message:"Invalid or expired token"})
               }
            }catch(except){
                throw(except)
            }
        }
          async setPassword (req,res,next){
            try{
                let data= req.body
                console.log(data)
            }catch(except){
                throw(except)
            }
        }
        login= (req,res,next)=>{
    
        }
       forgotPassword = (req,res,next)=>{
    
        }
        me= (req,res,next)=>{
    
        }
        logout= (req,res,next)=>{
    
        }
}



const authCtrl= new AuthController()

module.exports= authCtrl;