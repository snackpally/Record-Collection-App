
var albumSchema = new mongoose.Schema({
  "title": String,
  "artist": String,
  "album_img_link": String,
  "year": Number,
  "genre": String,
  "label": String,
  "track_count": Number,
  "track_list": Array
})
