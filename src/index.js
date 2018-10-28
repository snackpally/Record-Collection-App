import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './albums.json';
//create components
//class App extends React.Component {
//app component
class App extends React.Component {
  render() {
    return <RecordList />;
  }
}

//search componenet


//edit component
//class Edit extends React.Component {

//Record List Component
class RecordList extends React.Component {

  render() {
    let result = [];
    for(var i = 0; i < data.length; i++){
      result.push(<Album data={data[i]} />);
    }

    return result;
  }
}
//Record Component (contains title, artist, genre, album art link, tracklist, release date, label, trackCount)
class Album extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var album = this.props.data;
    return (
      <div className='album'>
      <ul>
      <li>
      <h1>{album.title}</h1></li>
      <li>{album.artist}</li>
      <li><img src={album.album_img_link} /></li>
      <li>{album.year}</li>
      <li>{album.genre}</li>
      <li>{album.label}</li>
      <li>{album.track_count}</li>
      <li>{album.track_list}</li>
      </ul>

      </div>
    );
  }
}





//Dom Render

ReactDOM.render(
<<<<<<< HEAD
  <h1>Hello, world!</h1>, //what to feed
  document.getElementById('root') //where to feed it
=======
  <App/>,
  document.getElementById('root')
>>>>>>> bd7eb9b17e365275401aae72bd1addf12d7190e9
);
