import {
  RECEIVE_ALL_WORKED_DOCS,
  RECEIVE_WORKED_DOC,
  REMOVE_WORKED_DOC
} from '../actions/worked_doc_actions';
import merge from 'lodash/merge';

const WorkedDocsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_WORKED_DOCS:
      return merge({}, action.workedDocs);
    case RECEIVE_WORKED_DOC:
      return merge({}, oldState, {[action.workedDoc.doc_id]: action.workedDoc});
    case REMOVE_WORKED_DOC:
      let newState = merge({}, oldState);
      delete newState[action.workedDoc.id];
      return newState;
    default:
      return oldState;
  }
};

export default WorkedDocsReducer;
