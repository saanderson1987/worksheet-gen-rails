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
    documents: Object.keys(state.documents).map(id => state.documents[id]),
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDocuments: (data) => dispatch(fetchDocuments(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocList);



// It is acceptable for problems ws1.problems to be an array as well
// (works out the same, except index starts at 0).
let ws1 = {
  title: 'WS1',
  owner_id: 1,
  doc_type: 'fill-in-the-blank',
  instructions: 'Fill in the blanks with the words in the bank.',
  problems: {
    1: {

      textPieces: [
        {
          text : "Three days was simply not a(n)",
          blank : false,

        },
        {
          text : "acceptable",
          blank : true,

        },
        {
          text : "amount of time to complete such a lot of work.",
          blank : false,

        },
      ]
    },
    2: {

      textPieces: [
        {
          text : "You don't need to be a(n)",
          blank : false,

        },
        {
          text : "genius",
          blank : true,

        },
        {
          text : "to see what the problem here is.",
          blank : false,

        },
      ]
    },
    3: {

      textPieces: [
        {
          text : "Make sure you read all the",
          blank : false,

        },
        {
          text : "instructions",
          blank : true,

        },
        {
          text : "carefully before setting up the device",
          blank : false,

        },
      ]
    },
  }
};
