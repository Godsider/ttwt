import React from "react";
import PropTypes from "prop-types";


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


//the default values for props
OneTag.defaultProps = {
  caption: "What's here?",
  style: {
    left: "0",
    top: "0"
  }
};


//typechecking of props
OneTag.propTypes = {
  num: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  style: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}


export default OneTag;

