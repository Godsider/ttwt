import React from 'react';


function OneTag( props ) {  //renders a regular tag
  return (
    <div className = "tag" draggable = "true" 
      onDragStart = { event => props.onDragStart( props.num, event )}
      onDragEnd = { event => props.onDragEnd( props.num, event )}
      style = { props.style }
    >
      <span onClick = { () => props.onTagClick( props.num )}>   {/* <span> to separate onClick events for the caption and the button */}
        { props.caption }
      </span>
      <button onClick = { () => props.onDeleteClick( props.num )}> X </button>
    </div>
  );
}


export default OneTag;

