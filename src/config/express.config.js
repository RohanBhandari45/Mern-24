const express= require("express")

const app= express()

// const router= express.Router()

const router= require("../config/router/")
const { MulterError}= require("multer")
const { ZodError } = require("zod")

//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//

//routing

// app.use((req,res, next)=>{
    //always execute
    // manipulate req
    // respond to client
    // next middleware
// })

const checkLogin= (req,res,next)=>{
    //login
    let loggedIn= true
    if(loggedIn){
        next()
    } else{
        res.status(401).json({
            result: null,
            message: "No Logged In",
            meta: null,

        })
    }
} 
router.get('/about', checkLogin, (request,response, next)=>{ 

    // response.send() // to send html
    // home page fetch
    response.json({
        result: "About Us Page",
        message: "Success",
        meta: null,
    })
})




// app.get("/user/:detail",(req,res)=>{
//     // suru ma define garne ani balla execute hunxa
// })


// app.get('/user/:userId',(req,res)=>{
//     let userId= req.params.userId
//      let query= req.query  // for declaration of query string
// })

app.use('/api/v1',router)

// 404 handle middleware
app.use((req,res,next)=>{
    res.status(404).json({
        result: null,
        message: "Not Found",
        meta: null
    })
})
//



// Error handling middleware
app.use((error,req,res,next)=>{
    console.log("Garbage Collector: ",error)
    let code= error.code ?? 500;
    let message= error.message ?? "Internal Server Error"
    let result = error.result ?? null

    if(error instanceof MulterError){
        if(error.code === "LIMIT_FILE_SIZE"){
            code= 400;
            message= error.message
        }
    }



//     res.status(code).json({
//         result: null,
//         message: "Hello",
//         meta: null
//     })
// })
//

if(error instanceof ZodError){
    code =400
    let zodErrors= error.errors
    let msg={}
    zodErrors.map((err)=>{
        msg[err.path[0]] = err.message
    })
    message ="Validation Failure"
    result= msg
}
res.status(code).json({
    result: result,
    message: message,
    meta: null
})
})


module.exports= app;
