import {
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_DOCUMENT,
  REMOVE_DOCUMENT
} from '../actions/document_actions';
import merge from 'lodash/merge';

const DocumentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_DOCUMENTS:
      return merge({}, action.documents);
    case RECEIVE_DOCUMENT:
      return merge({}, oldState, {[action.doc.id]: action.doc});
    case REMOVE_DOCUMENT:
      let newState = merge({}, oldState);
      delete newState[action.doc.id];
      return newState;
    default:
      return oldState;
  }
};

export default DocumentsReducer;
