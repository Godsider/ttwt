// src/redux/reducers/index.js
/* Redux root reducer */

import {
  ADD_TAG,
//   CAPTION_EDIT_FINALIZE
} from "../constants/action-types";

const initialState = {
  tagsArray: [],
  editedTagNum: -1,         //number of the tag under editing; if editedTagNum < 0 -- no tags under editing
//   preEditingTagCaption: ""  //used for edit cancelling (stores pre-editing tag caption)
};

const rootReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_TAG:
      return { ...state, articles: [ ...state.articles, action.payload ]};
    default:
      return state;
  }
};

export default rootReducer;

