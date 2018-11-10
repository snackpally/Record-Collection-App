const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); //parses through JSON and body requests
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

var Album = mongoose.model('album', albumSchema);

const app = express();//Create basic server with express
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/getAlbumList', function(request, response){
  Album.find({}, function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log(err);
    } else{
      response.send(documents);
    }
  });
});

app.get('/get/:id', function(request, response){
  Album.find({}, function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log(err);
    } else{
      response.send(documents);
    }
  });
});

app.put('/update', function(request, response){
  Album.find({}, function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log(err);
    } else{
      response.send(documents);
    }
  });
});

app.put('/update/:title', function(request, response){
  console.log(request.body);
  Album.findOneAndUpdate({title:request.params.title}, request.body, {new: true}, function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log("I messed up");
    } else{
     response.send(request.body);
     console.log(request.body);
    }
  });
});

  app.delete('/delete/:title', function(request, response){
    Album.findOneAndRemove({title:request.params.title}, function(err, doc){//reach into our database and if error log error else send info
      if(err){
        console.log('I messed up');
      } else{
        console.log(doc);
        console.log('success');
      }
    });
  });

app.post('/create', function(request, response){
  console.log(request.body);
    var new_album = new Album(request.body);
    new_album.save(function(err,result) {
      if(err){
        console.log(err);
      } else {
        response.send(result);
      }
    });
});



app.listen(3001, function(){
  'Server is running on 3001'
});
