import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { flow } from 'lodash';

const newBlankSource = {
  beginDrag(props, monitor) {
    props.splitText();
    return {
      id: props.id,
      index: null,
      dragging: monitor.isDragging(),
    };
  },

  endDrag(props) {
    props.rejoinText();
  }
};

class NewBlank extends React.Component {
  render(){
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div className='blank' style={{margin: '5px', cursor: 'move',}}>
        <input
          placeholder="New blank"
          className='new-form-answer-input'
          style={{width: '115px', backgroundColor: 'white', cursor: 'move'}}
          disabled
        />
        <button className='modify-blank remove-blank'>-</button>

      </div>
    );
  }
}

export default DragSource(ItemTypes.NEWBLANK, newBlankSource,
  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(NewBlank);

{/* <div style={{margin: '5px', cursor: 'move', }}>
  <input
    className='new-form-answer-input'
    style={{cursor: 'move'}}
    disabled
    placeholder='New blank'
  />
</div> */}
