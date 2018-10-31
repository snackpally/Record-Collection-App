import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './albums.json';
//create components
//class App extends React.Component {
//app component
class App extends React.Component {
 render() {
   return <AlbumList />;
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
class AlbumList extends React.Component {

 render() {
   let result = [];
   for(var i = 0; i < data.length; i++){
     result.push(<Album data={data[i]} />);
   }

   return (
     <div className="cards">{result}</div>
   );
 }
}
//Record Component (contains title, artist, genre, album art link, tracklist, release date, label, trackCount)
class Album extends React.Component {
   constructor(props) {
        super(props);
   }
   makeTracklist(tracklist) {

  }

 render() {


   var album = this.props.data;
   var style = {
     backgroundImage:'url(' + album.album_img_link + ')',
   };
   return (
     <div id="f1_container">
       <div id="f1_card">
         <div className="front face" style={style}>
         </div>
         <div className="back face center">
           <div className="image-wrap"><img className="backPic" src={album.album_img_link} alt=""/></div>
           <div className="info-list">
               <ul>
                 <li><h1>{album.title}</h1></li>
                 <li>{album.artist}</li>
                 <li>{album.year}</li>
                 <li>{album.genre}</li>
                 <li>{album.label}</li>
                 <li>{album.track_count}</li>
                 <li>
                  <ol>
                    {album.track_list.map(track => {
                     return (
                       <li>{track}</li>
                     );
                    })}
                  </ol>
                </li>
               </ul>
             <Edit />
             </div>
         </div>
         </div>
     </div>
   );// todo map track list to display key and value
 }
}








//Dom Render

ReactDOM.render(
 <App/>,
 document.getElementById('root')
);
