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

function Picture(props) {
  //console.log("Rendering pic");
  return (
    <div className="thepic" onClick={ props.onClick }></div>
  );    //
}

function OneTag(props) {
  //console.log("Rendering 1 tag", props);
  return (
    <div className="tag" style={ props.style }>
      &lt;Go here!
      <button onClick={ props.onDeleteClick }>X</button>
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
      return (
        <OneTag key={ num } style={ tagStyle } onDeleteClick={ () => this.props.onDeleteClick(num) }/>
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
    this.state = { tagsArray: [] };    //adding new tag to the array; "The array literal notation [] is preferrable" over kind of "tagsArray: new Array()"
    this.picClick = this.picClick.bind(this);
    this.rmTag = this.rmTag.bind(this);
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
  
  rmTag(num) {
    const tagsArray = this.state.tagsArray.slice();
    tagsArray.splice(num, 1);
    this.setState({ tagsArray: tagsArray });
    //console.log("Tag del", num);
  }

  render() {
    //console.log("Render Lab, ", this.rmTag);
    const tagsArray = this.state.tagsArray;
    return (
      //separate elements for the pic and the tag cloud to not to mix up onClick events
      <div className="thebox">
        <Picture onClick={ this.picClick } />
        <TagsCloud tagsArray={ tagsArray } onDeleteClick={ num => this.rmTag(num) } />
      </div>
    );  //
  }
}

ReactDOM.render(<Labirynth />, document.getElementById("root"));
