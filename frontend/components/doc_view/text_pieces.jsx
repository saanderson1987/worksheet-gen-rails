import React from 'react';
import shortid from 'shortid';

class TextPieces extends React.Component {
  render() {
    const checkMark = <span>&#10004;</span>;

    return (
      <div>
        {
          Object.values(this.props.problem.textPieces).map( (textPiece, idx) => {
            if (textPiece.blank === 'true') {
              let background = 'white';
              let answerText = '';
              if (textPiece.correct !== undefined) {
                background = textPiece.correct ? '#00ff00' : '#ff2f2f';
                const answer = this.props.answerKey ? this.props.answerKey[this.props.problemIdx].textPieces[idx].text : '';
                answerText = textPiece.correct ? '' :
                  <span style={{background: '#ffeb3b'}}>CORRECT: {answer}</span>;
              }
              return (
                <div key={idx}>
                  <input
                    key={ idx }
                    value={ textPiece.text }
                    onChange={ this.props.handleInputChange(this.props.problemIdx, idx) }
                    style={{background}}
                  />
                  { answerText }
                </div>
              );
            } else {
              return <div key={ idx }> { textPiece.text } </div>;
            }
          })
        }
      </div>
    );
  }
}

export default TextPieces;
