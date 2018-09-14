import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { 
  captionEditFinalize,
  setTagsCaption
} from "../redux/actions/index";


const mapStateToProps = state => {
  return {
    tagsArray : state.tagsArray.slice(),
  };
};


const mapDispatchToProps = dispatch => {
  return {
    captionEditFinalize: () => dispatch( captionEditFinalize() ),
    setTagsCaption: newCaption => dispatch( setTagsCaption( newCaption )),
  };
};


// function TheOneTagEdited( props ) {  //renders a tag under editing
class TheOneTagEdited extends React.Component {  //renders a tag under editing

  constructor( props ) {
    super( props );
    this.state = {
      newCaption: "",
      preEditingTagCaption: "",   //backing up current tag's caption for the case if the edit cancelling will be performed
    };
    this.captionEditProceed = this.captionEditProceed.bind( this );
    this.handleEditKeyPress = this.handleEditKeyPress.bind( this );
  }

//   captionEditProceed( event ) {    //storing the caption text being entered
// //     const tagsArray = this.state.tagsArray.slice();
// //     const editedTagNum = this.state.editedTagNum;
// //     tagsArray[ editedTagNum ].caption = newCaption;
//     this.setState({ newCaption: event.target.value });
//   }

  handleEditKeyPress( event ) {   //catching Enter and Escape keypresses
    switch ( event.key ) {
      case "Escape":    //undo changes
        const tagsArray = this.state.tagsArray.slice();
        tagsArray[ this.state.editedTagNum ].caption = this.state.preEditingTagCaption;
        this.setState({ tagsArray: tagsArray });
        this.props.captionEditFinalize();
        break;
      case "Enter":     //finalize editing
        this.props.captionEditFinalize();
        break;
    }
  }

  return (
    <div className = "tag" style = { props.style }>
      <input type = "text" autoFocus size = "10" maxLength = "15" placeholder = "What's here?"
        onFocus = { event => event.target.select() }
        value = { props.caption }
        onChange = { event => this.props.setTagsCaption( event.target.value )}
        onKeyUp = { this.handleEditKeyPress }
      />
    </div>
  );
//         onChange = { this.captionEditProceed }
//         onChange = { event => this.captionEditProceed( event.target.value )}
//         onKeyUp = { event => this.handleEditKeyPress( event )}
}


//the default values for props
// OneTagEdited.defaultProps = {
//   caption: "What's here?",
//   style: {
//     left: "0",
//     top: "0"
//   }
// };


//typechecking of props
// OneTagEdited.propTypes = {
//   caption: PropTypes.string.isRequired,
//   style: PropTypes.shape({
//     left: PropTypes.string,
//     top: PropTypes.string
//   }).isRequired,
//   onTagChange: PropTypes.func.isRequired,
//   onKeyUp: PropTypes.func.isRequired
// }


const OneTagEdited = connect( null, mapDispatchToProps )( TheOneTagEdited );


export default OneTagEdited;
