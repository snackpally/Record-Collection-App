import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './albums.json';
//create components
//class App extends React.Component {
//app component
class App extends React.Component {
  render() {
    return (
      <div className="gridWrapper">
        <SearchBar data={this.props.data} />
      </div>
    );
  }
}

//search componet
class SearchBar extends React.Component {
  constructor(){
    super();
    this.state= {
      search: ''
    };
  }
  updateSearch(event){
    this.setState({search: event.target.value})
  }
  render() {
    let search = this.state.search.toLowerCase();
    let filterArtist = this.props.data.filter(
      (data) => {
        return (
          (data.artist.toLowerCase().indexOf(search) !== -1) ||
          (data.title.toLowerCase().indexOf(search) !== -1)||
          (data.genre.toLowerCase().indexOf(search) !== -1)||
          (data.label.toLowerCase().indexOf(search) !== -1)
        );
      }
    );
    return(
      <div className="searchField">
        <input type="text" value={this.state.search}
        onChange={this.updateSearch.bind(this)}/>
        <div>
          {filterArtist.map((data) => {
          return <AlbumCard data={data} />
          })}
        </div>
      </div>
    );
  }
}
// input componet
// todo create input form componet


//Record List Component
class AlbumList extends React.Component {
  render() {
    let result = [];
    for(var i = 0; i < data.length; i++){
      result.push(<AlbumCard data={data[i]} />);
    }
    return (
      <div className="cards">{result}</div>
    );
  }
}
//Record Component (contains title, artist, genre, album art link, tracklist, release date, label, trackCount)
class AlbumCard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        editing: false
      }
  }
  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }
  render() {
    var album = this.props.data;
    var style = {
      backgroundImage:'url(' + album.album_img_link + ')',
    };
    return (
      <div className="output">
        <div className="f1_container">
          <div className="f1_card">
            <div className="front face" style={style}>
            </div>
            <div className="back face">
              <ul className="info-list">
                <div className="topBack">
                  <li className="album-cover">
                    <img className="backPic" src={album.album_img_link} alt=""/>
                  </li>
                  <li className="styleTitle">
                    <h2><EditableField value={album.title} editing={this.state.editing}/></h2>
                  </li>
                  <li className="styleArtist">
                    <EditableField value={album.artist} editing={this.state.editing}/>
                  </li>
                  <li>
                    <EditableField value={album.year} editing={this.state.editing}/>
                  </li>
                  <li>
                    <EditableField value={album.genre} editing={this.state.editing}/>
                  </li>
                  <li>
                    <EditableField value={album.label} editing={this.state.editing}/>
                  </li>
                </div>
                <li className="tracklist">
                Track List:
                  <ol>
                    {album.track_list.map(track => {
                      return (
                        <li><EditableField value={track} editing={this.state.editing}/></li>
                      );
                    })}
                  </ol>
                </li>
              </ul>
              <button onClick={this.toggleEdit}>Edit</button>
            </div>
          </div>
        </div>
        <div className="metainfo">
          <h3>{album.title}</h3>
          <h4>{album.artist}</h4>
        </div>
      </div>
    );
  }
}

class EditableField extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: props.value,
      editing: props.editing
    }
  }
  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }
  handleChange(event) {
    this.setState({formValue: event.target.value});
  }

  handleSubmit(event) {
    this.setState({value: this.state.formValue});
    this.toggleEdit();
    event.preventDefault();
  }
  render() {
    if (this.state.editing){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder={this.state.value} value={this.state.formValue} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <button onClick={this.toggleEdit}>Cancel</button>
        </form>
      );
    }
    else {
      return (
        <div>
          {this.state.value}
          <button onClick={this.toggleEdit}>Edit</button>
        </div>
      );
    }
  }
}
//Dom Render

ReactDOM.render(
 <App data={data} />,
 document.getElementById('root')
);
