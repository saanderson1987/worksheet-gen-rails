import React from 'react';
import shortid from 'shortid';

class TextPieces extends React.Component {
  render() {
    return (
      <div>
        {
          Object.values(this.props.problem.textPieces).map( (textPiece, idx) => {
            if (textPiece.blank === 'true') {
              return (
                <input
                  key={ idx }
                  value={ textPiece.text }
                  onChange={ this.props.handleInputChange(this.props.problemIdx, idx) }
                />
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
