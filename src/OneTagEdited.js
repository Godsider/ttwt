import React from 'react';


function OneTagEdited( props ) {  //renders a tag under editing
  return (
    <div className = "tag" style = { props.style }>
      <input type = "text" autoFocus size="10" maxLength="15" placeholder="What's here?"
        onFocus = { event => event.target.select() }
        value = { props.caption }
        onChange = { event => props.onTagChange( event.target.value, event )}
        onKeyUp = { event => props.onKeyUp( event )}
      />
    </div>
  );
}


export default OneTagEdited;

