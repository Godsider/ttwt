import React from "react";
import TagsCloud from "./TagsCloud";
import "../index.css";


class Labirynth extends React.Component {   //main component

  constructor( props ) {
    super( props );
    this.state = { 
      tagsArray: [],
      editedTagNum: -1,         //number of the tag under editing; if editedTagNum < 0 -- no tags under editing
      preEditingTagCaption: ""  //used for edit cancelling (stores pre-editing tag caption)
    };
    this.picClick = this.picClick.bind( this );
    this.dragStart = this.dragStart.bind( this );
    this.dragEnd = this.dragEnd.bind( this );
    this.captionEditInitiate = this.captionEditInitiate.bind( this );
    this.captionEditProceed = this.captionEditProceed.bind( this );
    this.handleEditKeyPress = this.handleEditKeyPress.bind( this );
    this.rmTag = this.rmTag.bind( this );
  }

  dragStart( num, event ) {     //starting tag dragging
    this.dragX = event.nativeEvent.offsetX;
    this.dragY = event.nativeEvent.offsetY;
    const t = event.target;
    setTimeout( () => { t.classList.add( "hidden" )});
  }

  dragEnd( num, event ) {       //ending tag dragging
    event.target.classList.remove("hidden");
    const tagsArray = this.state.tagsArray.slice();
    tagsArray[ num ].left += event.nativeEvent.offsetX - this.dragX;
    tagsArray[ num ].top += event.nativeEvent.offsetY - this.dragY;
    this.setState({ tagsArray: tagsArray });
  }

  captionEditInitiate( num ) {    //the tag caption clicked, initiating the tag caption editing
    const { deletedTagNum, tagsArray } = this.captionEditFinalize();    //finalizing the current tag editing process (if any) before starting a new one
    if (( deletedTagNum !== null ) && ( deletedTagNum < num )) {    //if tag deletion took place, and if deleted tag's index is below the 'num'...
      num--;                                                        //...compensate the shift of elements within the tags array
    }
    this.setState({
      editedTagNum: num,
      preEditingTagCaption: tagsArray[ num ].caption   //backing up current tag's caption for the case if the edit cancelling will be performed
    });
  }

  captionEditProceed( newCaption ) {    //storing the caption text being entered
    const tagsArray = this.state.tagsArray.slice();
    const editedTagNum = this.state.editedTagNum;
    tagsArray[ editedTagNum ].caption = newCaption;
    this.setState({ tagsArray: tagsArray });
  }

  handleEditKeyPress( event ) {   //catching Enter and Escape keypresses
    switch ( event.key ) {
      case "Escape":    //undo changes
        const tagsArray = this.state.tagsArray.slice();
        tagsArray[ this.state.editedTagNum ].caption = this.state.preEditingTagCaption;
        this.setState({ tagsArray: tagsArray });
        this.captionEditFinalize();
        break;
      case "Enter":     //finalize editing
        this.captionEditFinalize();
        break;
    }
  }

  captionEditFinalize() {   //tag editing finalization routine
    const tagsArray = this.state.tagsArray.slice();
    var editedTagNum = this.state.editedTagNum;
    if (( editedTagNum >= 0 ) && !tagsArray[ editedTagNum ].caption ) {   //if the edited tag got an empty caption...
      tagsArray.splice( editedTagNum, 1 );                                //...delete the tag
    } else {
      editedTagNum = null;                                                //nullify if no tag was deleted
    }
    this.setState({
      tagsArray: tagsArray,
      editedTagNum: -1,
      preEditingTagCaption: ""
    });
    return ({
      deletedTagNum: editedTagNum,  //returning the index of the deleted tag, or null if no any
      tagsArray: tagsArray          //returning the most actual tagsArray, for those ( captionEditInitiate() ) who can't wait for state to synchronize
    })
  }

  picClick( event ) {   //creating a new tag or initiating the tag editing finalization
    if ( this.state.editedTagNum < 0 ) {    //if there is no tag under editing -- add a new tag to the array...
      const tagsArray = this.state.tagsArray.slice();
      tagsArray.push({
        caption: "",
        left: event.nativeEvent.offsetX,
        top: event.nativeEvent.offsetY
      });
      this.setState({ tagsArray: tagsArray, editedTagNum: tagsArray.length - 1 });
    } else {                                //...otherwise, go and finalize the tag editing
      this.captionEditFinalize();
    }
  }

  rmTag( num ) {    //tag delete button clicked
    if ( this.state.editedTagNum < 0 ) {    //if there is no tag under editing -- delete a tag...
      const tagsArray = this.state.tagsArray.slice();
      tagsArray.splice( num, 1 );
      this.setState({
        tagsArray: tagsArray,
        editedTagNum: -1
      });
    } else {                                //...otherwise, go and finalize the tag editing
      this.captionEditFinalize();
    }
  }

  renderPicture() {   //renders the background picture
    return (
      <div className = "thepic" onClick = { this.picClick }></div>
    );
  }

  render() {
    return (
      //setting the picture and the tags cloud apart to not to mix up their onClick events
      <div className = "thebox">
        { this.renderPicture() }
        <TagsCloud
          tagsArray = { this.state.tagsArray }
          editedTagNum = { this.state.editedTagNum }
          onDragStart = { this.dragStart }
          onDragEnd = { this.dragEnd }
          onTagClick = { this.captionEditInitiate }
          onTagChange = { this.captionEditProceed }
          onKeyUp = { this.handleEditKeyPress }
          onDeleteClick = { this.rmTag }
        />
      </div>
    );
  }
}


export default Labirynth;

