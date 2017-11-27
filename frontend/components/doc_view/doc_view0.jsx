import React from 'react';
import { connect } from 'react-redux';
import { fetchDocument } from '../../actions/document_actions.js';
import {cloneDeep} from 'lodash';
// import DocResults from './doc_results.jsx';
import Problems from './problems.jsx';
import WordBank from './word_bank.jsx';
import Instructions from './instructions.jsx';

import {ws1} from '../../util/exampleDB.js';
import {shuffle} from '../../util/methods.js';

const container = (props) => {
  const wordBank = [];
  const genBlanks = (problems) => {
    let probsWithBlanks = cloneDeep(problems);
    problems.forEach( (problem, problemIdx) => {
      problem.textPieces.forEach( (textPiece, idx) => {
        if (textPiece.blank) {
          wordBank.push(textPiece.text);
          probsWithBlanks[problemIdx].textPieces[idx].text = '';
        }
      });
    });
    return probsWithBlanks;
  };
  const probsWithBlanks = genBlanks(ws1.probs);
  shuffle(wordBank);

  return (
    <DocView
      {...props}
      problems={probsWithBlanks}
      title={ws1.title}
      course={ws1.course}
      instructions={ws1.instructions}
      wordBank={wordBank}
    />
  );
};

export default container;

class DocView extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      problems: this.props.problems,
      graded: false
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.problems.length > 0) {
      this.setState( {problems: nextProps.problems});
    }
  }

  render() {
    if (this.props.problems.length < 1) {
      return(<div>Loading...
          <br /> this.state:
          {JSON.stringify(this.state)}
          <br />this.props:
          {JSON.stringify(this.props)}</div>);
    }

    return (
      <div>
        <h1>{ this.props.title }</h1>
        <div>{this.props.course}</div>
        <Instructions instructions={this.props.instructions}/>
        <WordBank wordBank={this.props.wordBank}/>
        <Problems
          problems={this.state.problems}
          handleInputChange={this.handleInputChange}
        />
        <button className='button_green' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

  handleInputChange(problemIdx, textPieceIdx) {
    return (event) => {
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//     doc: state.documents[ownProps.match.params.id]
//   };
// };
//
// const mapDispatchToProps = dispatch => ({
//   fetchDocument: id => dispatch(fetchDocument(id))
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(DocView);
