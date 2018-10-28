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
    var style = {
      backgroundImage:'url(' + this.props.data.album_img_link + ')',
    };
    return (
      <div id="f1_container">
      <div id="f1_card" class="shadow">
      <div class="front face" style={style}><ul>
      <li><h1>{this.props.data.title}</h1></li>
      <li>{this.props.data.artist}</li>
      
      </ul></div>
      <div class="back face center"><ul>
      <li>{this.props.data.year}</li>
      <li>{this.props.data.genre}</li>
      <li>{this.props.data.label}</li>
      <li>{this.props.data.track_count}</li>
      <li>{this.props.data.track_list}</li>
      </ul>
      </div>
      </div>
      </div>
    );
  }
}





//Dom Render

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
