import React from 'react';
import RegularProblem from './Problem.jsx';
import DraggableProblem from './DraggableProblem.jsx';
import TextPieces from './TextPieces.jsx';
import shortid from 'shortid';

class Problems extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouse= this.handleMouse.bind(this);
    this.state = {
      draggable: true
    };
  }

  render() {

    let Problem = this.state.draggable ? DraggableProblem : RegularProblem;

    return (
      <div>
        {
          this.props.problems.map( (problem, idx) => {
            return(
              <Problem
                key={ shortid.generate() }
                id={problem.id}
                index={idx}
                {...this.props}
                question={problem.question}
                opaque={problem.opaque}
              >
                <div className='move-box'></div>
                <div
                  className='problem-text'
                  onMouseEnter={this.handleMouse('enter')}
                  onMouseLeave={this.handleMouse('leave')}
                >
                  { idx + 1 }.{' '}
                    <TextPieces
                      problem={this.props.problems[idx]}
                      problemIdx ={idx}
                      {...this.props}
                    />
                </div>
              </Problem>
            );
          })
        }
      </div>
    );
  }

  handleMouse(direction) {
    return(event) => {
      let draggable = direction === 'enter' ? false : true;
      this.setState({draggable});
    };
  }
}

export default Problems;

//Problem props:
// moveProblem={this.props.moveProblem}
// addNewProblem={this.props.addNewProblem}
// makeProbVisible={this.props.makeProbVisible}
// removeBlank={this.props.removeBlank}

//TextPieces props:
// handleTextPiecesInput={this.props.handleTextPiecesInput}
// removeBlank={this.props.removeBlank}
// dropBlank={this.props.dropBlank}
// moveBlank={this.props.moveBlank}
