const express = require('express');
const app = express();
const mongoDB = require('./config/db');

//MongoDb connection
mongoDB();

//Router integrations
app.use('/api',require("./routes/files"));

//listening on PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    console.log(`Running on PORT ${PORT}`);
})