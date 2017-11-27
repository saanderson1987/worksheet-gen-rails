import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import documents from './documents_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  documents
});

export default rootReducer;
