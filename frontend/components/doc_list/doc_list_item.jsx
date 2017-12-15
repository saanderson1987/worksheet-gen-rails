import React from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

export default class DocListItem extends React.Component {

  render() {
    const {doc, courseIdx, docIdx, subscribed, deleteDocument } = this.props;
    const path = subscribed ? 'my_subscribed_docs' : 'my_created_docs';

    return (
      <li className='doc-list-item' key={ shortid.generate() }>
        <Link to={`/${path}/${doc.id}`}>
          <div className='name-and-icon'>
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <div className='icon-name'>{ doc.title }</div>
          </div>
        </Link>
        {subscribed ? '' :
          <div>
            <Link to={`/${path}/${doc.id}/edit`}><span className='doc-list-item__edit'>Edit</span></Link>
            <span onClick={deleteDocument(doc.id, courseIdx, docIdx)} className='doc-list-item__edit'>Delete</span>
          </div>
        }

      </li>
    );
  }

}
