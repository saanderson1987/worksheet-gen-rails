import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../../actions/document_actions.js';
import { fetchWorkedDoc, createWorkedDoc, updateWorkedDoc, deleteWorkedDoc, resetBlanks } from '../../actions/worked_doc_actions.js';
import { shuffle } from '../../util/methods.js';
import {cloneDeep, merge } from 'lodash';
// import DocResults from './doc_results.jsx';
import SaveBar from '../ui/save_bar.jsx';
import ButtonRow from '../ui/button_row.jsx';
import Loading from '../ui/loading.jsx';
import Problems from './problems.jsx';
import WordBank from './word_bank.jsx';
import Instructions from './instructions.jsx';

class DocView extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.resetBlanks = this.resetBlanks.bind(this);
    const problems = this.props.workedDoc ? Object.values(this.props.workedDoc.problems) : [];
    this.state = {
      problems,
    };
  }

  componentDidMount() {
    this.props.fetchWorkedDoc(this.props.doc_id);
    this.props.fetchDocument(this.props.doc_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workedDoc) {
      this.setState({problems: nextProps.workedDoc.problems});
      this.setState( {saved: true} );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) {
      if (this.state.saved) this.setState({saved: false});
    }
  }

  render() {
    if (!this.props.workedDoc) return <Loading />;
    return (
      <div>
        <SaveBar save={this.updateDoc} updatedAt={this.props.workedDoc.updated_at} saved={this.state.saved}/>
        <div className='contents-container'>
          <h1>{ this.props.title }</h1>
          <div>{this.props.courseName}</div>
          <Instructions instructions={this.props.instructions}/>
          <WordBank wordBank={this.props.workedDoc.wordBank}/>
          <Problems
            problems={this.state.problems}
            handleInputChange={this.handleInputChange}
            answerKey={this.props.answerKey}
          />
          <ButtonRow>
            <button onClick={this.resetBlanks}>Reset</button>
            <button className='button--green' onClick={this.handleSubmit}>Grade</button>
          </ButtonRow>
        </div>
      </div>
    );
  }

  handleInputChange(problemIdx, textPieceIdx) {
    return (event) => {
      event.preventDefault();
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].textPieces[textPieceIdx].text = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const problems = this.state.problems;
    const updatedDoc = merge({}, this.props.workedDoc, {problems, graded: true});
    this.props.updateWorkedDoc(updatedDoc);
    this.setState({saved: true});
  }

  updateDoc(event) {
    event.preventDefault();
    const problems = this.state.problems;
    const updatedDoc = merge({}, this.props.workedDoc, {problems});
    this.props.updateWorkedDoc(updatedDoc);
    this.setState({saved: true});
  }

  resetBlanks(event) {
    event.preventDefault();
    // const updatedDoc = merge({}, this.props.workedDoc, {reset: true, graded: false});

    this.props.resetBlanks({id: this.props.workedDoc.id, reset: true, graded: false});
    this.setState({saved: true});
  }

}

const mapStateToProps = (state, ownProps) => {
  const doc_id = ownProps.match.params.id;
  const doc = state.documents[doc_id];
  const workedDoc = state.workedDocs[doc_id];
  let title, courseName, instructions;
  if (doc) {
    title = doc.title;
    courseName = doc.course.name;
    instructions = doc.instrucions;
  }
  let answerKey;
  if (doc && doc.problems && workedDoc && workedDoc.graded) {
    answerKey = doc.problems;
  }
  return {
    doc_id,
    title,
    courseName,
    instructions,
    workedDoc,
    answerKey
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(fetchDocument(id)),
  fetchWorkedDoc: id => dispatch(fetchWorkedDoc(id)),
  createWorkedDoc: workedDoc => dispatch(createWorkedDoc(workedDoc)),
  updateWorkedDoc: workedDoc => dispatch(updateWorkedDoc(workedDoc)),
  deleteWorkedDoc: id => dispatch(deleteWorkedDoc(id)),
  resetBlanks: workedDoc => dispatch(resetBlanks(workedDoc))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocView);
