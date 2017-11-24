import React from 'react';

class TextPieces extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.problem.textPieces.map( (textPiece, idx) => {
            if (textPiece.blank) {
              return (
                <input
                  key={ textPiece.id }
                  value={ textPiece.text }
                  onChange={ this.props.handleInputChange(this.props.problemIdx, idx) }
                />
              );
            } else {
              return <div key={ textPiece.id }> { textPiece.text } </div>;
            }
          })
        }
      </div>
    );
  }
}

export default TextPieces;
