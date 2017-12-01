import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDocuments } from '../../actions/document_actions.js';
import shortid from 'shortid';

class DocList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const whichDocs = this.props.subscribed ? {subscribed: true} : {owned: true};
    this.props.fetchDocuments(whichDocs);
  }

  render() {
    const path = this.props.subscribed ? 'my_subscribed_docs' : 'my_created_docs';
    return (
      <div>
        <h3></h3>
        <ul>
          {this.props.documents ? this.props.documents.map( (doc) => {
            return (
              <li key={ shortid.generate() }>
                <Link to={`/${path}/${doc.id}`}>{ doc.title }</Link>
                { doc.owner_id === this.props.currentUser.id ?
                  <Link to={`/${path}/${doc.id}/edit`}>    Edit</Link>
                  : ''
                }
              </li>
            );
          }) : ''
        }
        </ul>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    documents: Object.keys(state.docTitles).map(id => state.docTitles[id]),
    currentUser : state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocuments: (data) => dispatch(fetchDocuments(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocList);
