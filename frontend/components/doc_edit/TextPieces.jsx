import React from 'react';
import TextPiece from './TextPiece.jsx';
import AutosizeInput from 'react-input-autosize';
import shortid from 'shortid';

class TextPieces extends React.Component {
  render() {
    return (
      <div className='new-form-text-pieces'>
        {
          this.props.problem.textPieces.map( (textPiece, idx) => {
            if (textPiece.blank === 'true') {
              return (
                  <div key={ shortid.generate() } className='blank'>
                    <input
                      placeholder="Answer blank"
                      className='new-form-answer-input'
                      value={ this.props.problem.textPieces[idx].text }
                      onChange={ this.props.handleTextPiecesInput(this.props.problemIdx, idx) }
                    />
                    <button className='modify-blank remove-blank' onClick={ (event) => this.props.removeBlank(this.props.problemIdx, idx) }>-</button>

                  </div>
              );
            } else {
              const placeholder = idx === 0 ? 'Problem text' : '...continue text';
              const minWidth = idx === 0 ? '' : '10';

              return (
                <TextPiece
                  key={ shortid.generate() }
                  problemIdx={this.props.problemIdx}
                  textPieceIdx={idx}
                  dropBlank={this.props.dropBlank}
                  moveBlank={this.props.moveBlank}
                >
                  <AutosizeInput
                    placeholder={ placeholder }
                    minWidth={ minWidth }
                    inputClassName='new-form-text-piece-input'
                    value={ this.props.problem.textPieces[idx].text }
                    onChange={ this.props.handleTextPiecesInput(this.props.problemIdx, idx) }
                  />
                </TextPiece>
              );
            }
          })
        }
      </div>
    );
  }
}

export default TextPieces;
