const express=require('express');
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
dotenv.config();
const app=express();

//body parser to parse json data
app.use(express.json());

//allow cross origin sharing (differnt ports)
var cors = require('cors');
app.use(cors());


const Router=require('./routes/route.js');



app.use('/',Router);


const Connection = require('./db.js');

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const DATABASE_NAME = 'ecommerce';
const URL = process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-slvjufh-shard-00-00.ejrgjas.mongodb.net:27017,ac-slvjufh-shard-00-01.ejrgjas.mongodb.net:27017,ac-slvjufh-shard-00-02.ejrgjas.mongodb.net:27017/${DATABASE_NAME}?ssl=true&replicaSet=atlas-qgs623-shard-0&authSource=admin&retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8800; // Use the PORT provided by Heroku or 5000 locally


Connection(URL);
app.listen(PORT, function () {
   console.log(`Server is running on port ${PORT}`);
 });
 

// const mongoose=require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
// const db=mongoose.connection;
// db.on('error', function(error) {
//     console.error('Error connecting to MongoDB:', error);
//  });

// db.once('open', function(){
//    console.log('connected to Database :: MongoDB');
// });


// const port = 8000; 
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });










/*
const insertMonitorData=require('./insertMonitorsData.js');
insertMonitorData();


*/