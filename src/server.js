const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let db_url = 'mongodb://127.0.0.1/album_database'; //url to our database in mongoose
mongoose.connect(db_url);//can be a website

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));//if error connecting to db we console log error message

var albumSchema = new mongoose.Schema({
  "title": String,
  "artist": String,
  "album_img_link": String,
  "year": Number,
  "genre": String,
  "label": String,
  "track_count": Number,
  "track_list": Array
});

var User = mongoose.model('User', albumSchema, "albums");

const app = express();//Create basic server with express
app.use(cors());

app.get('/getAlbumList', function(request, response){
  User.find({}, function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log(err);
    } else{
      response.send(documents);
    }
  })
});

app.listen(3001, function(){
  'Server is running on 3001'
});
