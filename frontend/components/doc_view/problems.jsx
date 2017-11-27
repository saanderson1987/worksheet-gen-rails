import React from 'react';
import TextPieces from './text_pieces.jsx';
import shortid from 'shortid';

class Problems extends React.Component {
  render() {
    return (
      <div style={{paddingBottom: '20px'}}>
        {
          this.props.problems.map( (problem, idx) => {
            return (
              <div className='doc-form__problem' key={shortid.generate()}>
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
