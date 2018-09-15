import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Own imports
// import "../index.css";
import { 
//   setTagCaption,
//   deleteTag
  moveTag,
  initTagEdit,
  deleteTag
} from "../redux/actions/index";


// const mapStateToProps = state => {
//   return {
// //     tagsArray : state.tagsArray,
//   };
// };


const mapDispatchToProps = dispatch => {
  return {
//     setTagCaption: ( num, newCaption ) => dispatch( setTagCaption( num, newCaption )),
    moveTag: ( num, left, top ) => dispatch( moveTag( num, left, top )),
    initTagEdit: num => dispatch( initTagEdit( num )),
    deleteTag: num => dispatch( deleteTag( num )),
  };
};


// function OneTag( props ) {  //renders a regular tag
class TheOneTag extends React.Component {  //renders a regular tag

  constructor( props ) {
    super( props );
//     const currentCaption = props.tagsArray[ props.num ].caption;
//     this.state = {
//       tagCaption: currentCaption,
//       preEditingTagCaption: currentCaption,   //backing up current tag's caption for the case if the edit cancelling will be performed
//     };
    this.dragStart = this.dragStart.bind( this );
    this.dragEnd = this.dragEnd.bind( this );
  }

  dragStart( num, event ) {     //starting tag dragging
    this.dragX = event.nativeEvent.offsetX;
    this.dragY = event.nativeEvent.offsetY;
    const t = event.target;
    setTimeout( () => { t.classList.add( "hidden" )});
  }

  dragEnd( num, event ) {       //ending tag dragging
    event.target.classList.remove("hidden");
//     const tagsArray = this.state.tagsArray.slice();
//     tagsArray[ num ].left += event.nativeEvent.offsetX - this.dragX;
//     tagsArray[ num ].top += event.nativeEvent.offsetY - this.dragY;
//     this.setState({ tagsArray: tagsArray });
    this.props.moveTag(
      num,
      event.nativeEvent.offsetX - this.dragX,
      event.nativeEvent.offsetY - this.dragY
    );
  }

//   captionEditInitiate( num ) {    //the tag caption clicked, initiating the tag caption editing
//     const { deletedTagNum, tagsArray } = this.captionEditFinalize();    //finalizing the current tag editing process (if any) before starting a new one
//     if (( deletedTagNum !== null ) && ( deletedTagNum < num )) {    //if tag deletion took place, and if deleted tag's index is below the 'num'...
//       num--;                                                        //...compensate the shift of elements within the tags array
//     }
//     this.setState({
//       editedTagNum: num,
//       preEditingTagCaption: tagsArray[ num ].caption   //backing up current tag's caption for the case if the edit cancelling will be performed
//     });
//   }

  return (
    <div className = "tag" draggable = "true"
      onDragStart = { event => this.dragStart( this.props.num, event )}
      onDragEnd = { event => this.dragEnd( this.props.num, event )}
      style = { this.props.style }
    >
      <span onClick = { () => this.props.initTagEdit( this.props.num )}>   {/* <span> to separate onClick events for the caption and the button */}
        { this.props.caption }
      </span>
      <button onClick = { () => this.props.deleteClick( this.props.num )}> X </button>
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
//   onDragEnd: PropTypes.func.isRequired,
  initTagEdit: PropTypes.func.isRequired,
  moveTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
}


const OneTag = connect( null, mapDispatchToProps )( TheOneTag );


export default OneTag;

