import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import documents from './documents_reducer';
import newDocId from './new_doc_id_reducer';
import courses from './courses_reducer';
import workedDocs from './worked_docs_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  documents,
  newDocId,
  courses,
  workedDocs,
});

export default rootReducer;
