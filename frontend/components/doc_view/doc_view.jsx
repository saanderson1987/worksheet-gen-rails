import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../../actions/document_actions.js';
import { fetchWorkedDoc, createWorkedDoc, updateWorkedDoc } from '../../actions/worked_doc_actions.js';
import { shuffle } from '../../util/methods.js';
import {cloneDeep} from 'lodash';
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
    const problems = this.props.doc ? Object.values(this.props.doc.problems) : [];
    this.state = {
      problems,
      graded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.doc) {
    //   this.setState( {problems: Object.values(nextProps.doc.problems)});
    // }
    if (nextProps.keyFetched) {
      this.props.createWorkedDoc({doc_id: this.props.doc_id});
    }
  }

  componentDidMount() {
    this.props.fetchDocument(this.props.match.params.id);
  }

  render() {
    if (this.props.workedDoc === undefined) return <Loading />;

    return (
      <div>
        <SaveBar />
        <div className='contents-container'>
          <h1>{ this.props.doc.title }</h1>
          <div>{this.props.doc.course.name}</div>
          <Instructions instructions={this.props.doc.instructions}/>
          <WordBank wordBank={this.props.workedDoc.wordBank}/>
          <Problems
            problems={this.state.problems}
            handleInputChange={this.handleInputChange}
          />
          <button className='button_green' onClick={this.handleSubmit}>Submit</button>
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
    this.setState({graded: true});
  }

}

const generateBlanks = (doc) => {
  let docWithBlanks = cloneDeep(doc);
  let wordBank = [];
  if (doc) {
    Object.values(doc.problems).forEach( (problem, problemIdx) => {
      Object.values(problem.textPieces).forEach( (textPiece, idx) => {
        if (textPiece.blank === 'true') {
          docWithBlanks.problems[problemIdx].textPieces[idx].text = '';
          wordBank.push(textPiece.text);
        }
      });
    });
  }
  return {
    doc: docWithBlanks,
    wordBank: shuffle(wordBank)
  };
};

const mapStateToProps = (state, ownProps) => {
  // const docWithBlanks = generateBlanks(state.documents[ownProps.match.params.id]);
  // return {
  //   doc: docWithBlanks.doc,
  //   wordBank : docWithBlanks.wordBank
  // };
  const doc_id = ownProps.match.params.id
  const keyFetched = state.documents[doc_id] ? true : false;
  return {
    keyFetched,
    doc: state.documents[doc_id],
    doc_id: ownProps.match.params.id,
    workedDoc: state.workedDocs[doc_id]
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(fetchDocument(id)),
  fetchWorkedDoc: id => dispatch(fetchWorkedDoc(id)),
  createWorkedDoc: workedDoc => dispatch(createWorkedDoc(workedDoc)),
  updateWorkedDoc: workedDoc => dispatch(updateWorkedDoc(workedDoc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocView);
