const express = require('express');
const app = express();
const mongoDB = require('./config/db');
const path = require('path');
const { json } = require('express');
app.set('views' , path.join(__dirname , '/views'));
app.set('view engine' , 'ejs');
//MongoDb connection
mongoDB();

app.use(express.json());

//Router integrations
app.use('/api',require("./routes/files"));
app.use('/files',require("./routes/show"));
app.use('/files/download' , require("./routes/download"));
//listening on PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    console.log(`Running on PORT ${PORT}`);
})