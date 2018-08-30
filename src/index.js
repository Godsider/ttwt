import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
<input
    value={this.state.value}
    onChange={(event) => this.setState({ value: event.target.value })}
    type="text"
/>
*/

function Picture( props ) {
  return (
    <div className = "thepic" onClick={ props.onClick }></div>
  );    //
}


function OneTag( props ) {
  return (
    <div className = "tag" draggable = "true" 
      onDragStart = { event => props.onDragStart( props.num, event )}
      onDragEnd = { event => props.onDragEnd( props.num, event )} 
      style = { props.style }
    >
      { props.caption }
      <button onClick = { () => props.onDeleteClick( props.num )}>X</button>
    </div>
  );    //
}


class TagsCloud extends React.Component {
    
  render() {
    const tagsArray = this.props.tagsArray;
    const tags = tagsArray.map(( elem, num ) => {
      const tagStyle = {
        left: elem.left + "px",
        top: elem.top + "px"
      }
      return (
        <OneTag 
          key = { num }
          num = { num }
          caption = { elem.caption }
          style = { tagStyle } 
          onDragStart = { this.props.onDragStart } 
          onDragEnd = { this.props.onDragEnd } 
          onDeleteClick = { this.props.onDeleteClick }
        />
      );    //
    });
    return ( tags );
  }
}


class Labirynth extends React.Component {
  
  constructor( props ) {
    super( props );
    this.state = { tagsArray: [] };
    this.picClick = this.picClick.bind( this );
    this.rmTag = this.rmTag.bind( this );
    this.dragStart = this.dragStart.bind( this );
    this.dragEnd = this.dragEnd.bind( this );
  }

  picClick( event ) { //creating a new tag
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.push({    //adding new tag to the array
      caption: "<-Go here",
      left: event.nativeEvent.offsetX,
      top: event.nativeEvent.offsetY
    });
    this.setState({ tagsArray: tagsArray });
  }

  rmTag( num ) {  //deleting a tag
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.splice( num, 1 );
    this.setState({ tagsArray: tagsArray });
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

  render() {
    const tagsArray = this.state.tagsArray;
    return (
      //separating the pic and the tag cloud elements to not to mix up onClick events
      <div className = "thebox">
        <Picture onClick = { this.picClick } />   //
        <TagsCloud
          tagsArray = { tagsArray }
          onDragStart = { this.dragStart }
          onDragEnd = { this.dragEnd }
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
- implement custom caption at tag`s creation
- the reduxifying of the task
*/
