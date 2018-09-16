import {
  ADD_TAG,
  INIT_TAG_EDIT,
  SET_TAG_CAPTION,
  MOVE_TAG,
  DELETE_TAG,
  DELETE_ALL
} from "../constants/action-types";


export const addTag = ( event ) => ({
  type: ADD_TAG, 
  newTag: {
    caption: "",
    left: event.nativeEvent.offsetX,
    top: event.nativeEvent.offsetY
  }
});

export const initTagEdit = ( num ) => ({ type: INIT_TAG_EDIT, num: num });
export const setTagCaption = ( num, newCaption ) => ({ type: SET_TAG_CAPTION, num: num, newCaption: newCaption });
export const moveTag = ( num, left, top ) => ({ type: MOVE_TAG, num: num, left: left, top: top });
export const deleteTag = ( num ) => ({ type: DELETE_TAG, num: num });
export const deleteAll = () => ({ type: DELETE_ALL });

