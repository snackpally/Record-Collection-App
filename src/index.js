/*
  I have found a few issues here.

  1. Make sure you are using the unique key names on any collection of components
  either generated by iteration, or populated in an array. React needs this key
  value to efficiently flag elements as being in need of update.

  2. The problem you were having with the 'editable' feature, was that you were
  not notifying the child element that a prop has changed. Children re-render
  automatically if the parent's *state* changes, but not necessarily if a prop
  is changed.

  componentWillReceiveProps can be used in this situation, to update the child
  component when a new prop is received.
*/

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
      <div>
        <h1>Find your Tunes</h1>
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
          (data.title.toLowerCase().indexOf(search) !== -1) ||
          (data.genre.toLowerCase().indexOf(search) !== -1) ||
          (data.label.toLowerCase().indexOf(search) !== -1) ||
          (data.year.toString().indexOf(search) !== -1)
        );
      }
    );
    return(
      <div className="searchField">
        <input type="text" placeholder="Search..." value={this.state.search}
        onChange={this.updateSearch.bind(this)}/>
        <div className="gridWrapper">
          {/*
            It is important to pass the key along to any child in an array or
            iterator. React is using this for the virtual dom, to assure that the
            correct element is updated when state changes.
          */}
          {filterArtist.map((data, i) => {
          return <AlbumCard key={i} data={data} />
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
    console.log("toggleEdit has been triggered");
    this.setState((prevState) => ({
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
        <div className="card_container">
          <div className="card">
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
                <h3>Track List:</h3>
                  <ol>
                    {album.track_list.map((track,i) => {
                      return (
                        <li key={i}><EditableField key={i} value={track} editing={this.state.editing}/></li>
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

    /*
      From: https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change

      "Passing the intial state to a component as a prop is an anti-pattern
      because the getInitialState (in our case the constuctor) method is only
      called the first time the component renders. Never more. Meaning that,
      if you re-render that component passing a different value as a prop,
      the component will not react accordingly, because the component will
      keep the state from the first time it was rendered. It's very error prone."


    */

    this.state = {
      value: props.value,
      editing: props.editing
    }
  }

  /*
    Since the constructor is only called once, at the instantiation of the object,
    we have to tell react that we need to watch for incoming props
  */
  componentWillReceiveProps(newProp) {
    this.setState({ editing: newProp.editing });
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
    } else {
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
