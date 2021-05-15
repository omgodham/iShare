const router = require('express').Router();
const multer = require('multer');
const File = require('../models/files');
const { v4: uuid } = require('uuid');

//Using multer for file uploading

//1.Create stprage for the files
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});


//2.Create upload method
let upload = multer({
    storage,
    limits: { fileSize: 10000 * 100 }, //max size allow 100mb 
}).single('myfile');

router.post('/files', (req, res) => {

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: "File not found", err });
        }
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uuid: uuid()
        });

        await file.save().then((response) => {
            res.status(200).json({
                fileURL: `${process.env.APP_BASE_URL}/files/${response.uuid}`
            });
        });
    });
});


router.post("/files/send", async (req, res) => {
    const {sendTo,sendFrom,uuid} = req.body;
  
    const file = await File.findOne({ uuid: uuid });
    if (!file) {
        return res.status(422).json({ error: "file not found" });
    }

    if(file.sender || file.receiver) {
        return res.json({message : "File is already sent"});
    }

   

    const sendEmail = require("../services/emailService"); //rather than writing hole code here we use other file 
    const response = sendEmail({
        from: sendFrom,
        to: sendTo,
        subject: 'iShare',
        text: `${sendFrom}`,
        html: require("../services/emailTemplate")({ //created html template in other file
            sendFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: `${file.size / 1000} kB`,
            expires: '24 hours'
        })
    });

    if (response){

        file.sender = sendFrom;
        file.receiver = sendTo;
    
        file.save();
        return res.send({ message: "Email sent successfully" });
        
    }
       
    else 
        return req.send({ error: "Unable to send email" });

});
module.exports = router;