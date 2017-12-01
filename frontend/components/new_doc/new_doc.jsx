import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDocument } from '../../actions/document_actions.js';
import { cloneDeep } from 'lodash';
import ButtonRow from '../ui/button_row.jsx';

class NewDoc extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      doc: {
        title: '',
        doc_type: 'fill-in-the-blank',
      },
      submitted: false,
      redirect: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted && prevProps.newDocId !== this.props.newDocId) {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/my_created_docs/${this.props.newDocId}/edit`} />;
    }

    return (
      <div className='contents-container'>
        <h1>New Document</h1>
        <div className='new-doc-property'>
          <div className='new-doc-property__name'>Document Title:</div>
          <input name='title' value={this.state.doc.title} onChange={this.handleChange}/>
        </div>
        <div className='new-doc-property'>
          <div className='new-doc-property__name'>Document Type:</div>
          <select name='doc_type' value={this.state.doc.doc_type} onChange={this.handleChange}>
            <option value='fill-in-the-blank'>Fill-in-the-blank</option>
            <option disabled>More coming soon</option>
          </select>
        </div>
        <div className='new-doc-property'>
          <div className='new-doc-property__name'>Course:</div>
          <select name='course' onChange={this.handleChange}>

          </select>
        </div>
        <ButtonRow>
          <button>Cancel</button>
          <button className='button--green' onClick={this.submitForm}>Continue</button>
        </ButtonRow>
      </div>
    );
  }

  handleChange(event) {
    const doc = cloneDeep(this.state.doc);
    doc[event.target.name] = event.target.value;
    this.setState({
      doc
    });
  }

  submitForm(event) {
    event.preventDefault();
    this.props.createDocument(this.state.doc);
    this.setState({ submitted: true });
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    newDocId: state.newDocId
  };
};

const mapDispatchToProps = dispatch => ({
  createDocument: doc => dispatch(createDocument(doc))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDoc);
