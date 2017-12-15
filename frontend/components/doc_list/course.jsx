import React from 'react';
import shortid from 'shortid';
import DocListItem from './doc_list_item.jsx';

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDocList = this.toggleDocList.bind(this);
    this.state = {
      viewDocList: false,
    };
  }

  render() {
    const {course, courseIdx, subscribed} = this.props;
    const { viewDocList } = this.state;
    const caret = viewDocList ? "caret caret--down" : "caret";
    const folder = viewDocList ? "folder fa fa-folder-open" : "folder fa fa-folder";

    return (
      <div>
        <div className='name-and-icon' onClick={this.toggleDocList}>
          <div className='caret-and-folder'>
            <div className={caret}></div>
            <i className={folder} aria-hidden="true"></i>
          </div>
          <div className='icon-name'>{course.name}</div>
        </div>
        {viewDocList ?
          <ul>
            {course.doc_list.map( (doc, docIdx) => {
              return (
                <DocListItem key={shortid.generate()} doc={doc} docIdx={docIdx} courseIdx={courseIdx} subscribed={subscribed} deleteDocument={this.props.deleteDocument}/>
              );
            })}
          </ul> : ''
        }
      </div>
    );
  }

  toggleDocList(event) {
    const viewDocList = this.state.viewDocList ? false : true;
    this.setState({viewDocList});
  }

}
