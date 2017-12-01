import { RECEIVE_ALL_DOCUMENTS } from '../actions/document_actions';
import merge from 'lodash/merge';

const DocTitlesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_DOCUMENTS:
      return merge({}, oldState, action.documents);
    default:
      return oldState;
  }
};

export default DocTitlesReducer;
