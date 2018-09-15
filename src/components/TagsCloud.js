import React from "react";
import { connect } from "react-redux";

// Own imports
// import { 
//   addTag 
//   
// } from "../redux/actions/index";
import OneTag from "./OneTag";
import OneTagEdited from "./OneTagEdited";


const mapStateToProps = state => {
  return {
    tagsArray : state.tagsArray,
    editedTagNum: state.editedTagNum,
  };
};


// const mapDispatchToProps = dispatch => {
//   return {
//     setTagCaption: ( num, newCaption ) => dispatch( setTagCaption( num, newCaption )),
//     deleteTag: num => dispatch( deleteTag( num )),
//   };
// };


class TheTagsCloud extends React.Component {   //renders a whole cloud of tags

  render() {
    const tagsArray = this.props.tagsArray.slice();
    const editedTagNum = this.props.editedTagNum;
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
//             caption = { elem.caption }
//             onTagChange = { this.props.onTagChange }
//             onKeyUp = { this.props.onKeyUp }
      } else {
        return (   //tag in a regular state
          <OneTag 
            key = { num }
            num = { num }
            caption = { elem.caption }
            style = { tagStyle }
          />
        );
//             onDragStart = { this.props.onDragStart } 
//             onDragEnd = { this.props.onDragEnd }
//             onTagClick = { this.props.onTagClick }
//             onDeleteClick = { this.props.onDeleteClick }
      }
    });
    return ( tags );
  }
}


const TagsCloud = connect( mapStateToProps )( TheTagsCloud );


export default TagsCloud;

