const router = require('express').Router();
const File = require('../models/files');

router.get("/:uuid", async (req,res)=>{
        const file = await File.findOne({uuid:req.params.uuid});
            if(!file){
                return res.render("download" , {error:'Somehing went wrong'});
            }

            res.render('download' , {file:file , downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`});
});

module.exports = router;