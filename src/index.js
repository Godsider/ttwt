import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
Lab: {
    thePic > onClick handler^: tag creation
    tagsCloud: {
      oneTag > onDeleteClick handler^^: tag deletion; change, dragging
    }
}
*/
/*
<input
    value={this.state.value}
    onChange={(event) => this.setState({ value: event.target.value })}
    type="text"
/>
*/
function Picture(props) {
  //console.log("Rendering pic");
  return (
    <div className="thepic" onClick={ props.onClick }></div>
  );    //
}


function OneTag(props) {
  //console.log("Rendering 1 tag", props);
  return (
    <div className = "tag" draggable = "true" 
      onDragStart = {( event ) => { props.onDragStart( props.num, event )}}
      onDrag = {( event ) => { props.onDrag( props.num, event )}} 
      onDragEnd = {( event ) => { props.onDragEnd( props.num, event )}} 
      style = { props.style }
    >
      { props.caption }
      <button onClick = { props.onDeleteClick }>X</button>
    </div>
  );    //
}


class TagsCloud extends React.Component {
    
  render() {
    const tagsArray = this.props.tagsArray;
    const tags = tagsArray.map((elem, num) => {
      const tagStyle = {
        left: elem.left + "px",
        top: elem.top + "px"
      }
      //tagStyle.transform = elem.isVisible ? "translateX(0px)" : "translateX(-30px)";
      return (
        <OneTag 
          key = { num }
          num = { num }
          caption = { elem.caption }
          style = { tagStyle } 
          isVisible = { elem.isVisible }
          onDragStart = { this.props.onDragStart } 
          onDrag = { this.props.onDrag }
//           onDragEnd={ () => this.props.onDragEnd(num) } 
//++++++++++
          //onDragEnd = { this.fixDrag(num) } 
          onDragEnd = { this.props.onDragEnd } 
//++++++++++
          
          onDeleteClick = { () => this.props.onDeleteClick(num) }
//           drag={this.props.drag}
        />
      );    //
      //?: "() => ...(num)" -- why so? how it actually works?
    });
    //console.log("Rendering tags", tags);
    return ( tags );
  }
}


class Labirynth extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { tagsArray: [] };  //adding new tag to the array; "The array literal notation [] is preferrable" over kind of "tagsArray: new Array()"
    this.picClick = this.picClick.bind(this);
    this.rmTag = this.rmTag.bind(this);
    //this.fixDrag = this.fixDrag.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    //console.log("Construct", this.state, this);
  }

  picClick(event) { //creating a new tag
    //console.log("Clicked! ");
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.push({    //adding new tag to the array
      caption: "<-Go here",
      left: event.nativeEvent.offsetX,
      top: event.nativeEvent.offsetY,
      
      isVisible: true   //trying to control tag's source still image visibility during the drag
    });
    this.setState({ tagsArray: tagsArray });
  }
/*
Labyrinth.onDeleteClick = f(num) { ret this.rmTag(num) } >> rmTag(num) execution

TagsCloud.onDeleteClick = f() {
  ret f(num) { 
    ret Labyrinth.rmTag(num)
  }
}

OneTag.onClick = ^
*/
  rmTag(num) {
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.splice(num, 1);
    this.setState({ tagsArray: tagsArray });
    //console.log("Tag del", num);
  }

  dragStart( num, event ) {
    this.dragX = event.nativeEvent.offsetX;
    this.dragY = event.nativeEvent.offsetY;
        const t = event.target;
        setTimeout( () => { t.classList.add("hidden"); });
    //console.log("Dragging", this.dragX, this.dragY);
      //const tagsArray = this.state.tagsArray.slice();
      //tagsArray[num].isVisible = false;   //trying to hide source still image
      //this.setState({ tagsArray: tagsArray });
/* Trying to hide source tag image (throws exception)
        //window.requestAnimationFrame( () => event.target.style.visibility = "hidden" );
    setTimeout(function(event) { event.target.style.visibility = "hidden"; }, 1);
*/
    //console.log("Dragging", arguments, tagsArray[num]);
    //event.dataTransfer.setData("offsetY", event.nativeEvent.offsetY);
    //event.dataTransfer.setData("offsetX", event.nativeEvent.offsetX);
    //console.log("Offs", event.dataTransfer.getData("offsetX"), event.dataTransfer.getData("offsetY"));
  }
  
  drag( num, event ) {/*
    const tagsArray = this.state.tagsArray.slice();
    //console.log(this.dragX, this.dragY, tagsArray[num]);
    tagsArray[num].left += event.nativeEvent.offsetX - this.dragX;
    tagsArray[num].top += event.nativeEvent.offsetY - this.dragY;
    this.setState({ tagsArray: tagsArray });*/
  }

  dragEnd( num, event ) {
        event.target.classList.remove("hidden");
    const tagsArray = this.state.tagsArray.slice();
    //console.log(this.dragX, this.dragY, tagsArray[num]);
    tagsArray[num].left += event.nativeEvent.offsetX - this.dragX;
    tagsArray[num].top += event.nativeEvent.offsetY - this.dragY;
    //tagsArray[num].isVisible = true;    //trying to unhide source still image
    this.setState({ tagsArray: tagsArray });
/* Trying to unhide source tag image
    setTimeout(function(event) { event.target.style.visibility = ""; }, 1);
*/
    //console.log("Lab dragEnd");
  }

  render() {
    //console.log("Render Lab, ", this.rmTag);
    const tagsArray = this.state.tagsArray;
    return (
      //separate elements for the pic and the tag cloud to not to mix up onClick events
      <div className = "thebox">
        <Picture onClick = { this.picClick } />   //
        <TagsCloud
          tagsArray = { tagsArray }
          onDragStart = { this.dragStart }
          onDrag = { this.drag }
          onDragEnd = { this.dragEnd }
//           onDragEnd = { num => this.fixDrag(num) }
          onDeleteClick = { num => this.rmTag(num) }
        />
      </div>
    );  
  }
}


ReactDOM.render(<Labirynth />, document.getElementById("root"));


/*** Todo ***

+ dragging -- dont`t let the tag be visible at it's source position while dragging (hide source tag or update/re-render dynamically as mouse moves (onDrag))
V dragging -- via props (not via closure) (implemented with dragStart())
- editing of the tag caption
- implement custom caption at tag`s creation
- the reduxifying of the task
*/
