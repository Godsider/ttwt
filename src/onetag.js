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


function OneTagEdited( props ) {  //renders a tag in an edited state
  return (
    <div className = "tag" style = { props.style }>
      <input type = "text" autoFocus size="10" maxLength="15" placeholder="What's here? huh"
        onFocus = { event => event.target.select() }
        value = { props.caption }
        onChange = { event => props.onTagChange( event.target.value, event )}
        onKeyUp = { event => props.onKeyUp( event )}
      />
    </div>
  );
}


export { OneTag, OneTagEdited };
