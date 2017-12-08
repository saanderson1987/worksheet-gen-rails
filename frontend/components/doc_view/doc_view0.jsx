import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../../actions/document_actions.js';
import { fetchWorkedDoc, createWorkedDoc, updateWorkedDoc } from '../../actions/worked_doc_actions.js';
import { shuffle } from '../../util/methods.js';
import {cloneDeep, merge } from 'lodash';
// import DocResults from './doc_results.jsx';
import SaveBar from '../ui/save_bar.jsx';
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
    if (!this.props.doc) return <Loading />;
    if (!this.props.workedDoc) return <Loading />;
    return (
      <div>
        <SaveBar save={this.updateDoc} updatedAt={this.props.workedDoc.updated_at} saved={this.state.saved}/>
        <div className='contents-container'>
          <h1>{ this.props.doc.title }</h1>
          <div>{this.props.doc.course.name}</div>
          <Instructions instructions={this.props.doc.instructions}/>
          <WordBank wordBank={this.props.workedDoc.wordBank}/>
          <Problems
            problems={this.state.problems}
            handleInputChange={this.handleInputChange}
          />
          <button className='button_green' onClick={this.handleSubmit}>Grade</button>
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

}

const mapStateToProps = (state, ownProps) => {
  const doc_id = ownProps.match.params.id;
  const doc = state.documents[doc_id];
  let answerKey;
  if (doc && doc.problems) {
    answerKey = doc.problems;
    delete doc.problems; // hide problem answers from user
  }
  return {
    doc: state.documents[doc_id],
    doc_id,
    workedDoc: state.workedDocs[doc_id],
    answerKey
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(fetchDocument(id)),
  fetchWorkedDoc: id => dispatch(fetchWorkedDoc(id)),
  createWorkedDoc: workedDoc => dispatch(createWorkedDoc(workedDoc)),
  updateWorkedDoc: workedDoc => dispatch(updateWorkedDoc(workedDoc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocView);
