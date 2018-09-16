import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Custom imports
import { 
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
    setTagCaption: ( num, newCaption ) => dispatch( setTagCaption( num, newCaption )),
    deleteTag: num => dispatch( deleteTag( num )),
  };
};


class TheOneTagEdited extends React.Component {  // renders a tag under editing

  constructor( props ) {
    super( props );
    const currentCaption = props.tagsArray[ props.num ].caption;
    this.state = {
      tagCaption: currentCaption,
      preEditingTagCaption: currentCaption,   // backing up current tag's caption for the case if the edit cancelling will be performed
    };
    this.captionEditProceed = this.captionEditProceed.bind( this );
    this.handleEditKeyPress = this.handleEditKeyPress.bind( this );
    this.finalizeEditing = this.finalizeEditing.bind( this );
  }

  captionEditProceed( event ) {    // storing the caption text being entered
    this.setState({ tagCaption: event.target.value });
  }

  handleEditKeyPress( event ) {   // catching Enter and Escape keypresses

    switch ( event.key ) {

      case "Escape":    // undo changes
        this.finalizeEditing( this.state.preEditingTagCaption );
        break;

      case "Enter":     // finalize editing
        this.finalizeEditing( this.state.tagCaption );
        break;

      default:
        return;
    }
  }

  finalizeEditing( newCaption ) {   // tag editing finalization routine
    if ( newCaption.trim() ) {                                  // if the edited tag got a non-empty caption...
      this.props.setTagCaption( this.props.num, newCaption );   // ...save tag's new caption to the global state...
    } else {
      this.props.deleteTag( this.props.num );                   // ...otherwise, delete the tag
    }
  }

  render() {
    return (
      <div className = "tag" style = { this.props.style }>
        <input type = "text" autoFocus size = "10" maxLength = "15" placeholder = "What's here?"
          onFocus = { event => event.target.select() }
          value = { this.state.tagCaption }
          onChange = { this.captionEditProceed }
          onKeyUp = { this.handleEditKeyPress }
          onBlur = { () => this.finalizeEditing( this.state.tagCaption )}
        />
      </div>
    );
  }
}


// the default values for props
TheOneTagEdited.defaultProps = {
  style: {
    left: "0",
    top: "0"
  }
};


// typechecking of props
TheOneTagEdited.propTypes = {
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
