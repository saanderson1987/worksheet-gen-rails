import React from 'react';
import shortid from 'shortid';

class WordBank extends React.Component {
  render() {
    return (
      <div className='section word-bank'>
        <div className='header'>Word Bank</div>
        <div className='word-bank__words'>
          {
            this.props.wordBank.map( (word) => {
              return (
                <div key={shortid.generate()}>{word}</div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default WordBank;
