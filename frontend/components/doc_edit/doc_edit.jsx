import React from 'react';
import AutosizeInput from 'react-input-autosize';
import {cloneDeep} from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import shortid from 'shortid';
import merge from 'lodash/merge';

import SaveBar from './save_bar.jsx';
import Loading from '../ui/loading.jsx';
import Instructions from '../doc_view/instructions.jsx';
import Problems from './Problems.jsx';
import ButtonRow from '../ui/button_row.jsx';
import Toolbox from './Toolbox.jsx';

class EditDocForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateDoc = this.updateDoc.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleTextPiecesInput = this.handleTextPiecesInput.bind(this);
    this.moveProblem = this.moveProblem.bind(this);
    this.addNewProblem = this.addNewProblem.bind(this);
    this.makeProbVisible = this.makeProbVisible.bind(this);
    this.dropBlank = this.dropBlank.bind(this);
    this.moveBlank = this.moveBlank.bind(this);
    this.removeBlank = this.removeBlank.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
    this.makeProbVisible = this.makeProbVisible.bind(this);
    this.splitText = this.splitText.bind(this);
    this.rejoinText = this.rejoinText.bind(this);
    const doc = this.props.doc ? this.props.doc : {};
    this.state = {
      ...doc
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.doc) {
      this.setState( nextProps.doc );
      this.setState( {saved: true} );
    }
  }

  componentDidMount() {
    this.props.fetchAdminedCourses();
    this.props.fetchDocument(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) {
      if (this.state.saved) this.setState({saved: false});
    }
  }

  render() {
    // if (this.props.doc === undefined) return <Loading />;
    if (!this.props.doc || !this.props.doc.problems){
      return <Loading />;
    }
    return (
      <div>
        <SaveBar updateDoc={this.updateDoc} updatedAt={this.props.doc.updated_at} saved={this.state.saved}/>
        <div className='edit-doc-container'>
          <div>
            <input
              name='title'
              value={ this.state.title }
              placeholder='Document name   '
              className='header-lg'
              onChange={ this.handleInput()}
            />
            <div className='new-doc-property'>
              <div className='new-doc-property__name'>Course:</div>
              <select name='course_id' value={this.state.course_id} onChange={this.handleInput()}>
                {this.props.courses ? this.props.courses.map( (course, id) => {
                    return (
                      <option key={id} value={course.id}>{course.name}</option>
                    );
                  }) : ''
                }
              </select>
            </div>
            <Instructions
              instructions={this.state.instructions}
              edit={true}
              handleInput={this.handleInput()}
            />
            <div className='section'>
              <div>
                <input
                  name='includeWordBank'
                  type='checkbox'
                  checked={this.state.includeWordBank}
                  onChange={this.handleInput()}
                />
                Include word bank
              </div>
              <div style={{fontStyle: 'italic'}}>
                Word bank will be automatically populated using the words in the blanks
              </div>
            </div>
            <div className='section problems-container'>
              <Problems
                problems={this.state.problems}
                moveProblem={this.moveProblem}
                addNewProblem={this.addNewProblem}
                makeProbVisible={this.makeProbVisible}
                removeBlank={this.removeBlank}
                handleQuestionInput={this.handleQuestionInput}
                handleTextPiecesInput={this.handleTextPiecesInput}
                dropBlank={this.dropBlank}
                moveBlank={this.moveBlank}
              />
              <Toolbox
                removeProblem={this.removeProblem}
                makeProbVisible={this.makeProbVisible}
                splitText={this.splitText}
                rejoinText={this.rejoinText}
              />
            </div>
          </div>
        </div>
        {JSON.stringify(this.state.problems)}
      </div>
    );
  }

  dropBlank(problemIdx, textPieceIdx) {
    // Don't allow blank to be dropped on a spot right after another blank
    const prevTextPiece = this.state.problems[problemIdx].textPieces[textPieceIdx - 1];
    if (prevTextPiece && prevTextPiece.blank === 'true') {
      return;
    }
    const problems = cloneDeep(this.state.problems);
    problems[problemIdx].textPieces.splice(textPieceIdx, 0, {
      text: '',
      blank: 'true',
      id: shortid.generate(),
    });
    const nextTextPiece = problems[problemIdx].textPieces[textPieceIdx + 1];
    if (!nextTextPiece) {
      problems[problemIdx].textPieces.splice(textPieceIdx + 1, 0, {
        text: '',
        blank: 'false',
        id: shortid.generate(),
      });
    }
    this.setState({ problems });
  }

  moveBlank(dragIndex, hoverIndex, problemIdx) {
    // If user tries to move last blank to space after last textPiece text,
    // don't move
    if (hoverIndex - dragIndex === 1) {
      return dragIndex;
    }
    // Don't allow blank to be moved to a spot right after another blank
    const prevTextPiece = this.state.problems[problemIdx].textPieces[hoverIndex - 1];
    if (prevTextPiece && prevTextPiece.blank === 'true') {
      return;
    }
    if (dragIndex !== 0 && hoverIndex - dragIndex === 2 && hoverIndex === this.state.problems[problemIdx].textPieces.length) {
      return dragIndex;
    }
    const problems = cloneDeep(this.state.problems);
    const textPieces = problems[problemIdx].textPieces;
    const dragBlank = textPieces.splice(dragIndex, 1)[0];
    textPieces.splice(hoverIndex, 0, dragBlank);
    // Delete blank textPiece at the end of the problem text that's
    // automatically added after a blank added to the end if this blank
    // is moved.
    if (textPieces[dragIndex + 1] && textPieces[dragIndex + 1].text === '') {
      textPieces.splice(dragIndex + 1, 1);
    }
    if (dragIndex === 0 && !textPieces[hoverIndex + 1]) {
      textPieces.push ({
        text: '',
        blank: 'false',
      });
    }
    this.setState({ problems });
    let newIndex = problems[problemIdx].textPieces.indexOf(dragBlank);
    console.log (newIndex);
    return newIndex;
  }

  removeBlank(problemIdx, textPieceIdx) {
      event.preventDefault();
      const problems = cloneDeep(this.state.problems);
      const textPieces = problems[problemIdx].textPieces;
      textPieces.splice(textPieceIdx, 1);
      if (textPieceIdx > 0) {
        // Combine the textPiece text that followed the blank with the textPiece text
        // that came before the blank. Inner if condition checks if there
        // were text, because there weren't, it messes up placeholder text.
        if (textPieces[textPieceIdx].text) {
          textPieces[textPieceIdx - 1].text += ' ' + textPieces.splice(textPieceIdx, 1)[0].text;
        } else {
          textPieces.splice(textPieceIdx, 1);
        }
      }
      this.setState({ problems });
  }

  moveProblem(dragIndex, hoverIndex) {
    // const problems = cloneDeep(this.state.problems);
    // const dragProblem = problems.splice(dragIndex, 1)[0];
    // problems.splice(hoverIndex, 0, dragProblem);
    // this.setState({ problems });

    const { problems } = this.state;
    const dragProblem = problems[dragIndex];
    dragProblem.opaque = true;
    this.setState(update(this.state, {
      problems: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragProblem],
        ],
      },
    }));
  }

  addNewProblem(idx) {
    const problem = {
      id: shortid.generate(),
      textPieces: [
        {
          text: '',
          blank: 'false',
          id: shortid.generate(),
        }
      ],
      opaque: true
    };
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 0, problem);
    this.setState( prevState => {
      return {problems};
    });
  }

  removeProblem(idx) {
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 1);
    this.setState({ problems });
  }

  makeProbVisible(idx) {
    const problems = cloneDeep(this.state.problems);
    delete problems[idx].opaque;
    this.setState({ problems });
  }

  handleInput() {
    return (event) => {
      const name = event.target.name;
      const value = event.target.type === 'checkbox' ?
        event.target.checked :
        event.target.value;
      this.setState({ [name]: value });
    };
  }

  handleQuestionInput(problemIdx) {
    return (event) => {
        const value = event.target.value;
        const problems = cloneDeep(this.state.problems);
        problems[problemIdx].question = value;
        this.setState( { problems });
      };
  }

  handleTextPiecesInput(problemIdx, textPieceIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].textPieces[textPieceIdx].text = value;
      this.setState({ problems });
    };
  }

  splitText() {
    // Goes through the textPieces of each problem and splits the text
    // of each textPiece so that every word is a textPiece.
    const problems = cloneDeep(this.state.problems);
    for (let h = 0; h < problems.length; h++) {
      let textPieces = problems[h].textPieces;
      let newTextPieces = [];
      for (let i = 0; i < textPieces.length; i++) {
        let textPiece = textPieces[i];
        if (textPiece.blank === 'true') {
          newTextPieces.push(textPiece);
        } else {
          let textArr = textPiece.text.split(' ');
          for (let j = 0; j < textArr.length; j++) {
            newTextPieces.push({
              text: textArr[j],
              blank: 'false',
              id: shortid.generate(),
            });
          }
        }
      }
      problems[h].textPieces = newTextPieces;
    }
    this.setState({problems});
  }

  rejoinText() {
    const problems = cloneDeep(this.state.problems);
    for (let h = 0; h < problems.length; h++) {
      let textPieces = problems[h].textPieces;
      let newTextPieces = [];
      for (let i = 0; i < textPieces.length; i++) {
        let textPiece = textPieces[i];
        if (textPiece.blank === 'true') {
          newTextPieces.push(textPiece);
        } else {
          // let prevTextPiece = textPieces[i-1];
          let prevTextPiece = newTextPieces[newTextPieces.length - 1];
          if (i === 0 || prevTextPiece.blank === 'true') {
            newTextPieces.push(textPiece);
          } else {
            prevTextPiece.text += ' ' + textPiece.text;
          }
        }
      }
      problems[h].textPieces = newTextPieces;
    }
    this.setState({problems});
  }

  updateDoc(event) {
    event.preventDefault();
    const updatedDoc = merge({}, this.props.doc, this.state);
    delete updatedDoc.saved;
    this.props.updateDocument(updatedDoc);
    this.setState({saved: true});
  }

}

export default DragDropContext(HTML5Backend)(EditDocForm);
