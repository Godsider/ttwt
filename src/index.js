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
    <div className="tag" draggable="true" 
      onDragStart={ props.onDragStart } 
//+++++
      onDragEnd={ props.onDragEnd } 
//      onDragEnd={ (event) => {props.onDragEnd(props.num, event)} } 
//++++++
      style={ props.style }
    >
      &lt;Go here!
      <button onClick={ props.onDeleteClick }>X</button>
    </div>
  );    //
}

class TagsCloud extends React.Component {
    
  fixDrag = (num) => {  //introducing a closure for "num" within TagsCloud, `cause that`s where "num" appears
    return (event) => {
      this.props.drag(num, event);
      console.log("Drag stop", arguments, num);
      //console.log("Offs", event.dataTransfer.getData("offsetX"), event.dataTransfer.getData("offsetY"));
      //console.log("Offs", event.nativeEvent.offsetX, event.nativeEvent.offsetY /*event.dataTransfer, event.nativeEvent.offsetX, event*/);
      /*const tagsArray = this.state.tagsArray.slice();
      tagsArray.splice(num, 1);
      this.setState({ tagsArray: tagsArray });*/
    }
  }
  
  render() {
    const tagsArray = this.props.tagsArray;
    const tags = tagsArray.map((elem, num) => {
      const tagStyle = {
        left: elem.left + "px",
        top: elem.top + "px"
      }
      return (
        <OneTag 
          key = { num }
          num = { num }
          style={ tagStyle } 
          onDragStart={ this.props.onDragStart } 
//           onDragEnd={ () => this.props.onDragEnd(num) } 
//++++++++++
          onDragEnd={ this.fixDrag(num) } 
//           onDragEnd={ this.props.drag } 
//++++++++++
          
          onDeleteClick={ () => this.props.onDeleteClick(num) }
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
    this.startDrag = this.startDrag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    //console.log("Construct", this.state, this);
  }

  picClick(event) { //creating a new tag
    //console.log("Clicked! ");
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.push({    //adding new tag to the array
        left: event.nativeEvent.offsetX,
        top: event.nativeEvent.offsetY
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
    console.log("Tag del", num);
  }

  startDrag(event) {
    this.dragX = event.nativeEvent.offsetX;
    this.dragY = event.nativeEvent.offsetY;
    console.log("Dragging", event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    /*event.dataTransfer.setData("offsetX", event.nativeEvent.offsetX);
    event.dataTransfer.setData("offsetY", event.nativeEvent.offsetY);
    console.log("Offs", event.dataTransfer.getData("offsetX"), event.dataTransfer.getData("offsetY"));*/
  }

  dragEnd(num, event) {
    console.log("Lab dragEnd.", arguments, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    const tagsArray = this.state.tagsArray.slice();
    console.log(this.dragX, this.dragY, tagsArray[num]);
    tagsArray[num].left += event.nativeEvent.offsetX - this.dragX;
    tagsArray[num].top += event.nativeEvent.offsetY - this.dragY;
    this.setState({ tagsArray: tagsArray });
  }

  render() {
    //console.log("Render Lab, ", this.rmTag);
    const tagsArray = this.state.tagsArray;
    return (
      //separate elements for the pic and the tag cloud to not to mix up onClick events
      <div className="thebox">
        <Picture onClick={ this.picClick } />   //
        <TagsCloud
          tagsArray={ tagsArray }
          onDragStart={ this.startDrag }
//           onDragEnd={ num => this.fixDrag(num) }
          onDeleteClick={ num => this.rmTag(num) }
          
          drag={this.dragEnd}
        />
      </div>
    );  
  }
}

ReactDOM.render(<Labirynth />, document.getElementById("root"));
