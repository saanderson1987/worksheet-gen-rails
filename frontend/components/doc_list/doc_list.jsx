import React from 'react';
import { Link } from 'react-router-dom';
// import EditDoc from './EditDoc.jsx';

import {docList} from '../../util/exampleDB.js';


const container = (props) => {
  return <DocList documents={docList}  {...props}/>;
};

export default container;

class DocList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const documents = this.props.documents ? this.props.documents.map( (doc) => {
      return (
        <li key={ doc.id }>
          <Link to={`documents/${doc.id}`}>{ doc.title }</Link>
          { this.props.docType === 'owner' ?
            <Link to={`documents/${doc.id}/edit`}>    Edit</Link>
            : ''
          }
        </li>
      );
    }) : '';

    return (
      <div>
        <h3></h3>
        <ul>
          {documents}
        </ul>
        {/* Props: {JSON.stringify(this.props)} */}
      </div>
    );
  }

}
