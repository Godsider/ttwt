import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Custom imports
import {
  moveTag,
  initTagEdit,
  deleteTag
} from '../redux/actions/index'

const mapStateToProps = state => {
  return {
    tagsArray: state.tagsArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
    moveTag: (num, left, top) => dispatch(moveTag(num, left, top)),
    initTagEdit: num => dispatch(initTagEdit(num)),
    deleteTag: num => dispatch(deleteTag(num))
  }
}

class TheOneTag extends React.Component { // renders a regular tag
  constructor (props) {
    super(props)
    this.tagLeft = props.tagsArray[ props.num ].left // tag's initial X
    this.tagTop = props.tagsArray[ props.num ].top // tag's initial Y
    this.dragOffsetX = null // initial dragging offset X
    this.dragOffsetY = null // initial dragging offset Y
    this.dragTarget = null // the tag under dragging
    this.underDragging = false // indicates if dragging is performing
    this.dragStart = this.dragStart.bind(this)
    this.dragProceed = this.dragProceed.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
  }

  dragStart (event) { // init dragging on mouse button press
//           console.log('dragStart ', document.onmouseup, event.currentTarget.style.transform, event.currentTarget);
//           console.log('dragStart2 ', event.nativeEvent.offsetX, event.nativeEvent.offsetY);
          console.log('dragStart3 ', event.pageX, event.pageY);
    event.preventDefault();
    if (event.button === 0) { // drag only if left button is pressed
//       ?document.getElementById('').addEventListener('mousemove', this.dragProceed) // bad way -- needs an unique ID
//       this.tagLeft = this.props.tagsArray[ this.props.num ].left
//       this.tagTop = this.props.tagsArray[ this.props.num ].top
      this.dragOffsetX = event.pageX
      this.dragOffsetY = event.pageY
      this.dragTarget = event.currentTarget
      document.onmousemove = this.dragProceed // preferable way
      document.onmouseup = this.dragEnd
      // determine pointer offset
      // determine boundaries
//           console.log('Start - Left button', document.onmouseup);
    }
  }

  dragProceed (event) { // reposition the tag while dragging
//           console.log('dragProceed ', event.target, event.pageX, event.pageY);
    this.dragTarget.style.transform = 'translate('
      + (this.tagLeft + event.pageX - this.dragOffsetX) + 'px, '
      + (this.tagTop + event.pageY - this.dragOffsetY) + 'px)'
    this.underDragging = true
//     document.onmouseup = this.dragEnd
    // if boundaries aren't violated, reposition the tag
//     if () {
//       
//     }
  }

  dragEnd (event) { // finalize dragging on mouse button release
//           console.log('dragEnd '/*, event.target.parentElement.parentElement*/);
    if (event.button === 0) { // stop dragging only if left button is released
//       ?document.getElementById('').removeEventListener... // bad way -- needs an unique ID
      document.onmousemove = null // preferable way
      document.onmouseup = null
      if (this.underDragging) { // if dragging is performing -- finalyze dragging...
        this.underDragging = false
        // calculating new coords
        this.tagLeft += event.pageX - this.dragOffsetX
        this.tagTop += event.pageY - this.dragOffsetY
  //       this.dragTarget.style.transform = 'translate('
  //         + this.tagLeft + 'px, '
  //         + this.tagTop + 'px)'
        // saving new coords to the state
        this.props.moveTag(
          this.props.num,
          this.tagLeft,
          this.tagTop
        )
      } else { // ...otherwise initiate tag editing
        this.props.initTagEdit(this.props.num)
      }
      this.dragOffsetX = this.dragOffsetY = this.dragTarget = null
          console.log('End - Left button', event.pageX, event.pageY);
    }
  }

/*  dragStart (event) { // starting tag dragging
    this.dragX = event.nativeEvent.offsetX
    this.dragY = event.nativeEvent.offsetY
    const t = event.target
    setTimeout(() => { t.classList.add('hidden') })
  }

  dragProceed (event) {
//     const tagsArray = this.state.tagsArray.slice();
    //console.log(this.dragX, this.dragY, tagsArray[num]);
//     tagsArray[ this.props.num ].left += event.nativeEvent.offsetX - this.dragX;
//     tagsArray[ this.props.num ].top += event.nativeEvent.offsetY - this.dragY;
//     this.setState({ tagsArray: tagsArray });
    
//     const newLeft = this.state.left + event.nativeEvent.offsetX - this.dragX
//     const newTop = this.state.top + event.nativeEvent.offsetY - this.dragY
// //         console.log(newLeft, newTop)
//     this.setState({
//       left: newLeft,
//       top: newTop
//     })
    const newLeft = this.state.left + event.dx
    const newTop = this.state.top + event.dy
        console.log('dragProceed ', newLeft, newTop)
    this.setState({
      left: newLeft,
      top: newTop
    })
  }
  
  dragEnd (event) { // ending tag dragging
    event.target.classList.remove('hidden')
    this.props.moveTag(
      this.props.num,
      this.props.tagsArray[ this.props.num ].left + event.nativeEvent.offsetX - this.dragX,
      this.props.tagsArray[ this.props.num ].top + event.nativeEvent.offsetY - this.dragY
    )
  }
*/

  render () {
    return (
//         onDragStart={this.dragStart}
//         onDragEnd={this.dragEnd}
//           onClick={() => this.props.initTagEdit(this.props.num)}
      <div className='tag' draggable='false'
        onMouseDown={this.dragStart}
        style={this.props.style}
      >   {/* <span> to separate onClick events for the caption and the button */}
        <span 
        >
          { this.props.caption }
        </span>
        <button onClick={() => this.props.deleteTag(this.props.num)}> X </button>
      </div>
    )
  }
}

// the default values for props
TheOneTag.defaultProps = {
  caption: "What's here?",
  style: {
    transform: 'translate(0, 0)'
  }
}

// typechecking of props
TheOneTag.propTypes = {
  tagsArray: PropTypes.array.isRequired,
  num: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  style: PropTypes.shape({
    transform: PropTypes.string
  }).isRequired,
  initTagEdit: PropTypes.func.isRequired,
  moveTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
}

const OneTag = connect(mapStateToProps, mapDispatchToProps)(TheOneTag)

export default OneTag
