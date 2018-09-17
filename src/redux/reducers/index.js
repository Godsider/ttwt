import {
  ADD_TAG,
  INIT_TAG_EDIT,
  SET_TAG_CAPTION,
  MOVE_TAG,
  DELETE_TAG,
  DELETE_ALL
} from '../constants/action-types'

const initialState = {
  tagsArray: [],
  editedTagNum: -1 // number of the tag under editing; editedTagNum < 0 means there's no tags under editing
}

const rootReducer = (state = initialState, action) => {
  const tagsArray = state.tagsArray.slice()

  switch (action.type) {
    case ADD_TAG:
      return {
        ...state,
        tagsArray: [ ...state.tagsArray, action.newTag ],
        editedTagNum: state.tagsArray.length
      }

    case INIT_TAG_EDIT:
      return {
        ...state,
        editedTagNum: action.num
      }

    case SET_TAG_CAPTION:
      tagsArray[ action.num ].caption = action.newCaption
      return {
        ...state,
        tagsArray: tagsArray,
        editedTagNum: -1
      }

    case MOVE_TAG:
      tagsArray[action.num].left = action.left
      tagsArray[action.num].top = action.top
      return {
        ...state,
        tagsArray: tagsArray
      }

    case DELETE_TAG:
      tagsArray.splice(action.num, 1)
      return {
        ...state,
        tagsArray: tagsArray,
        editedTagNum: -1
      }

    case DELETE_ALL:
      return initialState

    default:
      return state
  }
}

export default rootReducer
