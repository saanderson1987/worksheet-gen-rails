import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument, updateDocument } from '../../actions/document_actions.js';
import { fetchAdminedCourses } from '../../actions/course_actions.js';
import DocEdit from './doc_edit.jsx';
import shortid from 'shortid';

const mapStateToProps = (state, ownProps) => {
  const doc = state.documents[ownProps.match.params.id];
  if (doc && doc.problems) {
    doc.problems = Object.values(doc.problems);
    doc.problems.forEach( problem => {
      problem.id = shortid.generate();
      problem.textPieces = Object.values(problem.textPieces);
      problem.textPieces.forEach( textPiece => {
        textPiece.id = shortid.generate();
      });
    });
  }
  return {
    doc,
    courses: state.courses.adminedCourses
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(fetchDocument(id)),
  fetchAdminedCourses: () => dispatch(fetchAdminedCourses()),
  updateDocument: doc => dispatch(updateDocument(doc))
});

export default connect (mapStateToProps, mapDispatchToProps)(DocEdit);
