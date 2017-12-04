import * as WorkedDocApiUtil from '../util/worked_doc_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_ALL_WORKED_DOCS = 'RECEIVE_ALL_WORKED_DOCS';
export const RECEIVE_WORKED_DOC = 'RECEIVE_WORKED_DOC';
export const REMOVE_WORKED_DOC = 'REMOVE_WORKED_DOC';

export const fetchWorkedDocs = (data) => dispatch => {
  return WorkedDocApiUtil.fetchWorkedDocs(data).then(workedDocs => dispatch(receiveAllWorkedDocs(workedDocs)));
};

export const fetchWorkedDoc = id => dispatch => (
  WorkedDocApiUtil.fetchWorkedDoc(id).then(workedDoc => dispatch(receiveWorkedDoc(workedDoc)))
);

export const createWorkedDoc = workedDoc => dispatch => {
  return WorkedDocApiUtil.createWorkedDoc(workedDoc).then(newWorkedDoc => dispatch(receiveWorkedDoc(newWorkedDoc)));
};

export const updateWorkedDoc = workedDoc => dispatch => (
  WorkedDocApiUtil.updateWorkedDoc(workedDoc).then(updatedWorkedDoc => dispatch(receiveWorkedDoc(updatedWorkedDoc)))
);

export const deleteWorkedDoc = id => dispatch => (
  WorkedDocApiUtil.deleteWorkedDoc(id).then(workedDoc => dispatch(removeWorkedDoc(workedDoc)))
);


export const receiveAllWorkedDocs = workedDocs => {
  return {
    type: RECEIVE_ALL_WORKED_DOCS,
    workedDocs
  };
};

export const receiveWorkedDoc = workedDoc => ({
  type: RECEIVE_WORKED_DOC,
  workedDoc
});

const removeWorkedDoc = workedDoc => ({
  type: REMOVE_WORKED_DOC,
  workedDoc
});
