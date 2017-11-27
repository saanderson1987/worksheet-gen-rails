import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument, updateDocument } from '../../actions/document_actions.js';
import DocEdit from './doc_edit.jsx';

const mapStateToProps = (state, ownProps) => {
  const doc = state.documents[ownProps.match.params.id];
  if (doc) {
    doc.problems = Object.values(doc.problems);
    doc.problems.forEach( problem => {
      problem.textPieces = Object.values(problem.textPieces);
    });
  }
  return {
    doc
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(fetchDocument(id)),
  updateDocument: doc => dispatch(updateDocument(doc))
});

export default connect (mapStateToProps, mapDispatchToProps)(DocEdit);
