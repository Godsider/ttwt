import React from "react";
import { connect } from "react-redux";
import OneTag from "./OneTag";

import { addTag } from "../redux/actions/index";

import OneTagEdited from "./OneTagEdited";


const mapStateToProps = state => {
  return { articles: state.articles };
};


const mapDispatchToProps = dispatch => {
  return {
    addTag: () => dispatch( addTag() );
  };
};


class TagsCloud extends React.Component {   //renders a whole cloud of tags

  render() {
    const tagsArray = this.props.tagsArray;
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
            caption = { elem.caption }
            style = { tagStyle } 
            onTagChange = { this.props.onTagChange }
            onKeyUp = { this.props.onKeyUp }
          />
        );
      } else {
        return (   //tag in a regular state
          <OneTag 
            key = { num }
            num = { num }
            caption = { elem.caption }
            style = { tagStyle } 
            onDragStart = { this.props.onDragStart } 
            onDragEnd = { this.props.onDragEnd }
            onTagClick = { this.props.onTagClick }
            onDeleteClick = { this.props.onDeleteClick }
          />
        );
      }
    });
    return ( tags );
  }
}


const OneTagEdited = connect( mapStateToProps, mapDispatchToProps )( TheOneTagEdited );


export default TagsCloud;

