import React from "react";
import PropTypes from "prop-types";


function OneTagEdited( props ) {  //renders a tag under editing
  return (
    <div className = "tag" style = { props.style }>
      <input type = "text" autoFocus size = "10" maxLength = "15" placeholder = "What's here?"
        onFocus = { event => event.target.select() }
        value = { props.caption }
        onChange = { event => props.onTagChange( event.target.value, event )}
        onKeyUp = { event => props.onKeyUp( event )}
      />
    </div>
  );
}


//the default values for props
OneTagEdited.defaultProps = {
  caption: "What's here?",
  style: {
    left: "0",
    top: "0"
  }
};


//typechecking of props
OneTagEdited.propTypes = {
  caption: PropTypes.string.isRequired,
  style: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string
  }).isRequired,
  onTagChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired
}


export default OneTagEdited;

