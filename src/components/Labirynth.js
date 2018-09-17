import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Custom imports
import { addTag, deleteAll } from '../redux/actions/index'
import TagsCloud from './TagsCloud'
import '../index.css'

const mapDispatchToProps = dispatch => {
  return {
    addTag: event => dispatch(addTag(event)),
    deleteAll: () => dispatch(deleteAll())
  }
}

function TheLabirynth (props) { // main component
  return (
    // setting the picture and the tags cloud apart to not to mix up their onClick events
    <div>
      <div className='thebox'>
        <div className='thepic' onClick={props.addTag} />
        <TagsCloud />
      </div>
      <button className='delall' onClick={props.deleteAll}> Delete all </button>
    </div>
  )
}

// typechecking of props
TheLabirynth.propTypes = {
  addTag: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired
}

const Labirynth = connect(null, mapDispatchToProps)(TheLabirynth)

export default Labirynth
