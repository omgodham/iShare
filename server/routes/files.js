const router = require('express').Router();
const multer = require('multer');
const File = require('../models/files');
const {v4:uuid} = require('uuid');
let storage = multer.diskStorage({
    destination: (req , file , cb) => cb(null , 'uploads/'),
    filename : (req , file , cb) => cb(null , Date.now() + file.originalname)
})

let upload = multer({
    storage,
    limit : {fileSize : 100000 * 100},
}).single('myfile');

router.post('/files' , (req,res) => {


    upload(req,res, async (err)=>{
        if(!req.file){
        return res.json({error:"File not found"});
        }       
        if(err){
                return res.status(500).json({error:err.message});
            }

            const file = new File({
                filename:req.file.filename,
                path:req.file.path,
                size:req.file.size,
                uuid:uuid()
            });

           await file.save().then((response) => {
                res.status(200).json({
                    response,
                    fileURL : `${process.env.APP_BASE_URL}/files/${response.uuid}`
                });
            });
    });
})
module.exports = router;