import './Home.css';
import React from "react";
import axios from 'axios';
import LinkDiv from '../LinkDiv/LinkDiv';

export default function Home(){
    let url = null;
    let tempVal = null;
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let [videosId,setVideosId] = React.useState("");
    let [vidList,setVidList] = React.useState([]);
    let [isError,setIsError] = React.useState(false);

    function handleChange(event){
      if (event.key === 'Enter') {
      url = event.target.value;
      regExp.test(url) ? tempVal = url.match(regExp): console.log("Failure");
      if (tempVal && tempVal[2].length === 11) {
        setIsError(false);
        setVideosId(prevVideosId => tempVal[2]);
      }
      else if(!url){}
      else{
        setIsError(true);
      }}
    } 
  
    
    React.useEffect(()=>{
      const axios = require("axios");
      if(videosId){
      const optionhome = {
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/search`,
        params: {
          part: 'snippet',
          relatedToVideoId: videosId,
          key: `${process.env.REACT_APP_API_KEY_YOUTUBE}`,
          maxResults: 5,
          relevanceLanguage: 'en',
          type: "video",
        }
      }
      axios.request(optionhome).then(function (response){
        let itemSet = response.data.items;
        let items = itemSet.filter(item => 'snippet' in item && 'title' in item.snippet);
        items = items.sort((a,b) => a.snippet.title.length - b.snippet.title.length);
        setVidList(()=>items.map(item=>
          (item.snippet.title && item.id.videoId) ? <LinkDiv key = {item.etag} id = {item.id.videoId} title = {item.snippet.title}/>
           : console.log("failure"))
      )})
  
    }},[videosId]);


    return (
        <div className="Home">
          <h1 className = "heading">Youtube API Project</h1>
          <h1 className = "lowheading">Put a link in below and click enter to view a clickable <br/> list of similar youtube videos.   
          </h1>
            <input type = "text" className = "subheading" placeholder='Put in a video url' onKeyDown = {handleChange}/>
          <div className = "youtube">
            {!isError && vidList}
          </div>
          {isError && <div className = "lowheading">Error: Not a proper youtube link.</div>}
        </div>
      );
}
