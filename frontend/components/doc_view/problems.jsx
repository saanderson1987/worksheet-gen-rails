import React from 'react';
import TextPieces from './text_pieces.jsx';

class Problems extends React.Component {
  render() {
    return (
      <div style={{paddingBottom: '20px'}}>
        {
          this.props.problems.map( (problem, idx) => {
            return (
              <div className='doc-form__problem' key={problem.id}>
                <div>{idx+1}.</div>
                <TextPieces
                  problem={this.props.problems[idx]}
                  problemIdx ={idx}
                  {...this.props}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Problems;
