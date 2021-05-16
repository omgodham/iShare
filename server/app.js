const express = require('express');
const app = express();
const mongoDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

app.set('views' , path.join(__dirname , '/views'));
app.set('view engine' , 'ejs');
//MongoDb connection
mongoDB();

//middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({limit: 104857600 , extended: true  }));

//Router integrations
app.use('/api',require("./routes/files"));
app.use('/files',require("./routes/show"));
app.use('/files/download' , require("./routes/download"));
//listening on PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    console.log(`Running on PORT ${PORT}`);
})