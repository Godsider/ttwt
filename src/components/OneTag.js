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
    this.dragStart = this.dragStart.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
  }

  dragStart (event) { // starting tag dragging
    this.dragX = event.nativeEvent.offsetX
    this.dragY = event.nativeEvent.offsetY
    const t = event.target
    setTimeout(() => { t.classList.add('hidden') })
  }

  dragEnd (event) { // ending tag dragging
    event.target.classList.remove('hidden')
    this.props.moveTag(
      this.props.num,
      this.props.tagsArray[ this.props.num ].left + event.nativeEvent.offsetX - this.dragX,
      this.props.tagsArray[ this.props.num ].top + event.nativeEvent.offsetY - this.dragY
    )
  }

  render () {
    return (
      <div className='tag' draggable='true'
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        style={this.props.style}
      >
        <span onClick={() => this.props.initTagEdit(this.props.num)}>   {/* <span> to separate onClick events for the caption and the button */}
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
