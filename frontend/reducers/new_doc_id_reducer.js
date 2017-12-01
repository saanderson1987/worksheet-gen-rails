import { RECEIVE_DOCUMENT } from '../actions/document_actions';
import merge from 'lodash/merge';

const NewDocIdReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_DOCUMENT:
      return action.doc.id;
    default:
      return oldState;
  }
};

export default NewDocIdReducer;
