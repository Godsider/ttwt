// src/redux/actions/index.js
/* Redux actions */

import {
  ADD_TAG,
//   CAPTION_EDIT_FINALIZE,
  SET_TAG_CAPTION,
  DELETE_TAG,
  MOVE_TAG,
  INIT_TAG_EDIT
} from "../constants/action-types";

export const addTag = () => ({ type: ADD_TAG });
// export const captionEditFinalize = () => ({ type: CAPTION_EDIT_FINALIZE });
export const initTagEdit = ( num ) => ({ type: INIT_TAG_EDIT, num: num });
export const setTagCaption = ( num, newCaption ) => ({ type: SET_TAG_CAPTION, num: num, newCaption: newCaption });
export const moveTag = ( num, left, top ) => ({ type: MOVE_TAG, num: num, left: left, top: top });
export const deleteTag = ( num ) => ({ type: DELETE_TAG, num: num });

