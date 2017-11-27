import React from 'react';

export default class Problem extends React.Component {
  componentWillReceiveProps(nextProps) {
    // Remove new blank if new blank drag item leaves problem and reset its index.
    if (nextProps.isNewBlankOver !== this.props.isNewBlankOver &&
      !nextProps.isNewBlankOver && this.props.newBlank.index !== null &&
      !nextProps.didNewBlankDrop) {
      this.props.removeBlank(this.props.index, this.props.newBlank.index);
      this.props.newBlank.index = null;
    }
  }

  render(){
    let wrapper = rendered => rendered;
    let style = {};
    if (this.props.connectDragSource) {
      const { isDragging, connectDragSource, connectDropTarget,
        connectAnotherDropTarget, connectNewBlankDropTarget,opaque } =
        this.props;
      const opacity = isDragging || opaque ? 0 : 1;
      style= {opacity};
      wrapper = (rendered) => connectDragSource(connectDropTarget(
        connectAnotherDropTarget(connectNewBlankDropTarget(rendered))));
    }

    return wrapper(
      <div style={style} className='problem'>
        {this.props.children}
      </div>
    );
  }
}
