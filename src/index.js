import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TagsCloud from './tagscloud';


function Picture( props ) {   //renders the background picture
  return (
    <div className = "thepic" onClick= { props.onClick }></div>
  );
}


class Labirynth extends React.Component {   //main component

  constructor( props ) {
    super( props );
    this.state = { 
      tagsArray: [],
      editedTagNum: -1,    //number of the tag under editing; if editedTagNum < 0 -- no tags under editing
      preEditingTagCaption: ""    //used for edit cancelling (to store pre-editing tag caption)
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

  captionEditInitiate( num ) {    //initiating the tag caption editing
    this.captionEditFinalize();
    this.setState({
      editedTagNum: num,
      preEditingTagCaption: this.state.tagsArray[ num ].caption   //backing up current tag caption for the case if the edit cancelling operation will be performed
    });
  }
  
  captionEditProceed( newCaption ) {    //storing entered caption text
    const tagsArray = this.state.tagsArray.slice();
    const editedTagNum = this.state.editedTagNum;
    tagsArray[ editedTagNum ].caption = newCaption;
    this.setState({ tagsArray: tagsArray });
  }

  handleEditKeyPress( event ) {   //catching Enter and Escape keypresses
    switch ( event.key ) {
      case "Escape":    //undo editing
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
    const editedTagNum = this.state.editedTagNum;
    if (( editedTagNum >= 0 ) && !tagsArray[ editedTagNum ].caption ) {   //if the edited tag got an empty caption...
      tagsArray.splice( editedTagNum, 1 );    //...delete the tag
    }
    this.setState({
      tagsArray: tagsArray,
      editedTagNum: -1,
      preEditingTagCaption: ""
    });
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
    } else {    //...otherwise, go and finalize the tag editing
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
    } else {    //...otherwise, go and finalize the tag editing
      this.captionEditFinalize();
    }
  }

  render() {
    return (
      //separating the pic and the tag cloud elements to not to mix up onClick events
      <div className = "thebox">
        <Picture onClick = { this.picClick } />
        <TagsCloud
          tagsArray = { this.state.tagsArray }
          editedTagNum = { this.state.editedTagNum }
          onDragStart = { this.dragStart }
          onDragEnd = { this.dragEnd }
          onTagClick = { this.captionEditInitiate }
          onTagChange = { this.captionEditProceed }
          onKeyUp = { this.handleEditKeyPress }
              onTagUnfocus = { this.captionEditFinalize }
          onDeleteClick = { this.rmTag }
        />
      </div>
    );
  }
}


ReactDOM.render( <Labirynth />, document.getElementById( "root" ));

