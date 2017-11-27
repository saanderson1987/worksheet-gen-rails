import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const textPieceTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const problemIdx = props.problemIdx;
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    let hoverIndex = props.textPieceIdx;
    if (hoverClientX > hoverMiddleX) {
      hoverIndex ++;
    }
    if (dragIndex !== null) {
      if (dragIndex === hoverIndex) {
        return;
      }
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      console.log(dragIndex, hoverIndex);
      monitor.getItem().index = props.moveBlank(dragIndex, hoverIndex, problemIdx);
    } else {
      console.log(dragIndex, hoverIndex);
      props.dropBlank(problemIdx, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }

  },
};

class TextPiece extends React.Component {
  render() {
    const { connectDropTarget, opaque } = this.props;
    // const isActive = canDrop && isOver;
    const opacity = opaque ? 0 : 1;
    return connectDropTarget(
      <div style={{opacity, display: 'inline'}} >
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.NEWBLANK, textPieceTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  // isOver: monitor.isOver(),
  // canDrop: monitor.canDrop(),
}))(TextPiece);
