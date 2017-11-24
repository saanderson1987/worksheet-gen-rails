import React from 'react';

class WordBank extends React.Component {
  render() {
    return (
      <div className='section word-bank'>
        <div className='header'>Word Bank</div>
        <div className='word-bank__words'>
          {
            this.props.wordBank.map( (word) => {
              return (
                <div>{word}</div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default WordBank;
