import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Custom imports
import OneTag from "./OneTag";
import OneTagEdited from "./OneTagEdited";


const mapStateToProps = state => {
  return {
    tagsArray : state.tagsArray,
    editedTagNum: state.editedTagNum,
  };
};


function TheTagsCloud( props ) {   // renders a whole cloud of tags
  const tagsArray = props.tagsArray.slice();
  const editedTagNum = props.editedTagNum;
  const tags = tagsArray.map(( elem, num ) => {
    const tagStyle = {
      left: elem.left + "px",
      top: elem.top + "px"
    }
    if ( editedTagNum === num ) {
      return (   //tag while under editing
        <OneTagEdited
          key = { num }
          num = { num }
          style = { tagStyle } 
        />
      );
    } else {
      return (   //tag in a regular state
        <OneTag 
          key = { num }
          num = { num }
          caption = { elem.caption }
          style = { tagStyle }
        />
      );
    }
  });
  return ( tags );
}


// the default values for props
TheTagsCloud.defaultProps = {
  tagsArray: [],      //no tags by default
  editedTagNum: -1,   //number of the tag under editing; editedTagNum < 0 means no tags under editing
};


// typechecking of props
TheTagsCloud.propTypes = {
  tagsArray: PropTypes.array.isRequired,
  editedTagNum: PropTypes.number.isRequired
}


const TagsCloud = connect( mapStateToProps )( TheTagsCloud );


export default TagsCloud;

