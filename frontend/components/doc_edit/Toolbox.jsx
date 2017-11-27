import React from 'react';
import NewBlank from './NewBlank';
import NewProblem from './NewProblem';
import shortid from 'shortid';

class Toolbox extends React.Component {
  render() {
    return (
      <div className='toolbox'>
        <div className='toolbox-title'>Toolbox</div>
        <div className='toolbox-instructions'>Drag and drop the items below to modify the document</div>
        <div className='tools'>
          <NewProblem id={shortid.generate()} removeProblem={this.props.removeProblem} makeProbVisible={this.props.makeProbVisible} />
          <NewBlank id={shortid.generate()} splitText={this.props.splitText} rejoinText={this.props.rejoinText}/>
        </div>
      </div>
    );
  }
}

export default Toolbox;
