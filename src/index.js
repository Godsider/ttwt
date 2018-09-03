import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Picture( props ) {   //renders the background picture
  return (
    <div className = "thepic" onClick={ props.onClick }></div>
  );
}


function OneTag( props ) {  //renders a regular tag
  return (
    <div className = "tag" draggable = "true" 
      onDragStart = { event => props.onDragStart( props.num, event )}
      onDragEnd = { event => props.onDragEnd( props.num, event )}
      style = { props.style }
    >
      <span onClick = { () => props.onTagClick( props.num )}>   {/* <span> to separate onClick events for the caption and the button */}
        { props.caption }
      </span>
      <button onClick = { () => props.onDeleteClick( props.num )}> X </button>
    </div>
  );
}


function OneTagEdited( props ) {  //renders a tag in an edited state
//         onBlur = { props.onTagUnfocus }
  return (
    <div className = "tag" style = { props.style }>
      <input type = "text" autoFocus size="10" maxLength="15" placeholder="What's here?"
        onFocus = { event => event.target.select() }
        value = { props.caption }
        onChange = { event => props.onTagChange( event.target.value, event )}
        onKeyUp = { event => props.onKeyUp( event )}
      />
    </div>
  );
}


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
        return (   //tag in an edited state
          <OneTagEdited
            key = { num }
            caption = { elem.caption }
            style = { tagStyle } 
            onTagChange = { this.props.onTagChange }
            onKeyUp = { this.props.onKeyUp }
          />
        );
//                 onTagUnfocus = { this.props.onTagUnfocus }
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
//         this.captionEditFinalize = this.captionEditFinalize.bind( this );
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


/*** Todo ***

V dragging -- dont`t let the tag be visible at it's source position while dragging (hide source tag or update/re-render dynamically as mouse moves (onDrag))
V dragging -- via props (not via closure) (implemented with dragStart())
+ editing of the tag caption
+ implement custom caption at tag`s creation
- the reduxifying of the task
*/
