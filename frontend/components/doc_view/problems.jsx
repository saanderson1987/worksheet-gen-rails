import React from 'react';
import TextPieces from './text_pieces.jsx';
import shortid from 'shortid';

class Problems extends React.Component {
  render() {
    return (
      <div style={{paddingBottom: '20px'}}>
        {
          Object.values(this.props.problems).map( (problem, idx) => {
            return (
              <div className='doc-form__problem' key={idx}>
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
