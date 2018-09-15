import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own imports
import { 
//   captionEditFinalize,
  setTagCaption,
  deleteTag
} from "../redux/actions/index";


const mapStateToProps = state => {
  return {
    tagsArray : state.tagsArray,
  };
};


const mapDispatchToProps = dispatch => {
  return {
//     captionEditFinalize: () => dispatch( captionEditFinalize() ),
    setTagCaption: ( num, newCaption ) => dispatch( setTagCaption( num, newCaption )),
    deleteTag: num => dispatch( deleteTag( num )),
  };
};


// function TheOneTagEdited( props ) {  //renders a tag under editing
class TheOneTagEdited extends React.Component {  //renders a tag under editing

  constructor( props ) {
    super( props );
    const currentCaption = props.tagsArray[ props.num ].caption;
    this.state = {
      tagCaption: currentCaption,
      preEditingTagCaption: currentCaption,   //backing up current tag's caption for the case if the edit cancelling will be performed
    };
    this.captionEditProceed = this.captionEditProceed.bind( this );
    this.handleEditKeyPress = this.handleEditKeyPress.bind( this );
    this.finalizeEditing = this.finalizeEditing.bind( this );
  }

  captionEditProceed( event ) {    //storing the caption text being entered
//     const tagsArray = this.state.tagsArray.slice();
//     const editedTagNum = this.state.editedTagNum;
//     tagsArray[ editedTagNum ].caption = newCaption;
    this.setState({ tagCaption: event.target.value });
  }

  handleEditKeyPress( event ) {   //catching Enter and Escape keypresses
    switch ( event.key ) {
      case "Escape":    //undo changes
//         const tagsArray = this.state.tagsArray.slice();
//         tagsArray[ this.state.editedTagNum ].caption = this.state.preEditingTagCaption;
//         this.setState({ tagsArray: tagsArray });
        this.setState({ tagCaption: this.state.preEditingTagCaption });
        this.finalizeEditing();
        break;
      case "Enter":     //finalize editing
        this.finalizeEditing();
        break;
    }
  }

  finalizeEditing() {   //tag editing finalization routine
        console.log( "Unfocused: ", this.props.num );
    const newCaption = this.state.tagCaption;
//     const tagsArray = this.props.tagsArray.slice();
//     var editedTagNum = this.state.editedTagNum;
//     if (( editedTagNum >= 0 ) && !tagsArray[ editedTagNum ].caption.trim() ) {   //if the edited tag got an empty caption...
    if ( newCaption.trim() ) {                                  //if the edited tag got a non-empty caption...
//       editedTagNum = null;                                                       //nullify if no tag was deleted
      this.props.setTagCaption( this.props.num, newCaption );   //...save tag's new caption to the global state...
    } else {
      this.props.deleteTag( this.props.num );                   //...otherwise, delete the tag
//       tagsArray.splice( editedTagNum, 1 );                                       //...delete the tag
    }
//     this.setState({
//       tagsArray: tagsArray,
//       editedTagNum: -1,
//       preEditingTagCaption: ""
//     });
//     return ({
//       deletedTagNum: editedTagNum,  //returning the index of the deleted tag, or null if no any
//       tagsArray: tagsArray          //returning the most actual tagsArray, for those ( captionEditInitiate() ) who can't wait for state to synchronize
//     })
  }

  return (
    <div className = "tag" style = { this.props.style }>
      <input type = "text" autoFocus size = "10" maxLength = "15" placeholder = "What's here?"
        onFocus = { event => event.target.select() }
        value = { this.state.tagCaption }
        onChange = { this.captionEditProceed }
        onKeyUp = { this.handleEditKeyPress }
        onBlur = { this.finalizeEditing }
      />
    </div>
  );
//         onChange = { this.captionEditProceed }
//         onChange = { event => this.captionEditProceed( event.target.value )}
//         onKeyUp = { event => this.handleEditKeyPress( event )}
}


//the default values for props
OneTagEdited.defaultProps = {
  style: {
    left: "0",
    top: "0"
  }
};


//typechecking of props
OneTagEdited.propTypes = {
  tagsArray: PropTypes.array.isRequired,
  num: PropTypes.number.isRequired,
  style: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string
  }).isRequired,
  setTagCaption: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
}


const OneTagEdited = connect( mapStateToProps, mapDispatchToProps )( TheOneTagEdited );


export default OneTagEdited;
