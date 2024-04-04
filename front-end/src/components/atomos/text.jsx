import React from "react";

function textPage(props){
    console.log(props);
    return(
      <div>
      <h1 className="font-sans font-bold text-7xl text-black">{props.title}</h1>
      <p className="font-sans font-semibold">{props.description}</p>
      </div>
    )
}
export default textPage;