import React from "react";

export default function LinkDiv(props){
    let [hovered,setHovered] = React.useState(false);

    function handleLink(event,param){
        window.open(`http://www.youtube.com/watch?v=${param}`, '_blank')
    }

    return(
        <div className = {hovered ? "titlesethover" : "titleset"} onClick = {event =>handleLink(event,props.id)}
        onMouseEnter = {()=> setHovered(true)} onMouseLeave ={()=> setHovered(false)}>{props.title}</div>
    )
}