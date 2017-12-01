import * as DocumentApiUtil from '../util/document_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_ALL_DOCUMENTS = 'RECEIVE_ALL_DOCUMENTS';
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT';
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';

export const fetchSubscribedDocsList = data => dispatch => {
  return DocumentApiUtil.fetchSubscribedDocsList(data).then(docList => dispatch(receiveSubscribedDocsList(docList)));
}

export const fetchDocuments = (data) => dispatch => {
  return DocumentApiUtil.fetchDocuments(data).then(documents => dispatch(receiveAllDocuments(documents)));
};

export const fetchDocument = id => dispatch => (
  DocumentApiUtil.fetchDocument(id).then(doc => dispatch(receiveDocument(doc)))
);

export const createDocument = doc => dispatch => {
  return DocumentApiUtil.createDocument(doc).then(newDocument => dispatch(receiveDocument(newDocument)));
};

export const updateDocument = doc => dispatch => (
  DocumentApiUtil.updateDocument(doc).then(updatedDocument => dispatch(receiveDocument(updatedDocument)))
);

export const deleteDocument = id => dispatch => (
  DocumentApiUtil.deleteDocument(id).then(doc => dispatch(removeDocument(doc)))
);


const receiveAllDocuments = documents => {

  return {
    type: RECEIVE_ALL_DOCUMENTS,
    documents
  };
};

export const receiveDocument = doc => ({
  type: RECEIVE_DOCUMENT,
  doc
});

const removeDocument = doc => ({
  type: REMOVE_DOCUMENT,
  doc
});
