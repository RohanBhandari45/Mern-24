// file upload
const multer= require('multer');
const fs= require('fs')

const myStorage= multer.diskStorage({
    destination: (req, file, cb)=>{
        let path = req.uploadDir ?? "./public/uploads";
        if(!fs.existsSync(path)){
            fs.mkdirSync( path, {recursive: true} )
        }
        cb(null,path)
    },
    filename: (req, file, cb)=>{
        let random= Math.round(Math.random() * 9999)
        let ext= (file.originalname.split(".")).pop()
        let fileName= Date.now() + "-" + random  + "."+ext
        cb(null, fileName)
    }
})
// validation of file
 const imageFilter= (req, file, cb)=>{
    let ext= (file.originalname.split(".")).pop()
    let allowed= ['jpg','jpeg','png','gif','svg','bmp','webp']
    if(allowed.includes(ext.toLowerCase())){
        cb(null, true)
    } else{
        cb({code: 400, message:"File Format not supported"},null)
    }
 }
const uploader= multer({
     storage: myStorage,
     fileFilter: imageFilter,
     limits: {
        fileSize: 3*1024*1024
     }
})

module.exports= uploader