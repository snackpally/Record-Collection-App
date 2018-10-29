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

//search componet
// input componet
// todo create input form componet

//edit component
class Edit extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      value: 'Edit All',
    };
  }

    render() {
      return (
        <button className="editBtn" onClick={()=> {if (this.state.value === 'Edit All'){
          this.setState({value: 'Submit'})
        } else {
          this.setState({value: 'Edit All'})
        }
      }}>
          {this.state.value}
        </button>
      );
    }
}

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
  // constructor(props) {
  //   super(props);
  // }


  render() {


    var album = this.props.data;
    var style = {
      backgroundImage:'url(' + album.album_img_link + ')',
    };
    return (
      <div id="f1_container">
        <div id="f1_card" className="shadow">
          <div className="front face" style={style}>
          </div>
          <div className="back face center">
                <ul>
                  <li><img className="backPic" src={album.album_img_link} alt=""/></li>
                  <li><h1>{album.title}</h1></li>
                  <li>{album.artist}</li>
                  <li>{album.year}</li>
                  <li>{album.genre}</li>
                  <li>{album.label}</li>
                  <li>{album.track_count}</li>
                  // todo map track list to display key and value
                  <li>{album.track_list}</li>
                </ul>
              <Edit />
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
