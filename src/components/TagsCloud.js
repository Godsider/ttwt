import React from 'react';
import PropTypes from 'prop-types';
import OneTag from './OneTag';
import OneTagEdited from './OneTagEdited';


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


//the default values for props
TagsCloud.defaultProps = {
  caption: "What's here?",
  style: 
  onDragStart: 
  onDragEnd: 
  onTagClick: 
  onDeleteClick: 
  onTagChange: 
  onKeyUp: 
};


//typechecking of props
TagsCloud.propTypes = {
  key: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  style: 
  onDragStart: 
  onDragEnd: 
  onTagClick: 
  onDeleteClick: 
  onTagChange: 
  onKeyUp: 
}
  
export default TagsCloud;

