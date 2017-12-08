import {
  RECEIVE_ALL_WORKED_DOCS,
  RECEIVE_WORKED_DOC,
  REMOVE_WORKED_DOC,
  RECEIVE_RESET_WORKED_DOC
} from '../actions/worked_doc_actions';
import merge from 'lodash/merge';

const WorkedDocsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_WORKED_DOCS:
      return merge({}, action.workedDocs);
    case RECEIVE_WORKED_DOC:
      return merge({}, oldState, {[action.workedDoc.doc_id]: action.workedDoc});
    case RECEIVE_RESET_WORKED_DOC:
      newState = merge({}, oldState);
      delete newState[action.workedDoc.doc_id];
      newState[action.workedDoc.doc_id] = action.workedDoc;
      return newState;
    case REMOVE_WORKED_DOC:
      newState = merge({}, oldState);
      delete newState[action.workedDoc.doc_id];
      return newState;
    default:
      return oldState;
  }
};

export default WorkedDocsReducer;
