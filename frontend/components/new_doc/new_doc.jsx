import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createDocument } from '../../actions/document_actions.js';
import { fetchAdminedCourses } from '../../actions/course_actions.js';
import ButtonRow from '../ui/button_row.jsx';

class NewDoc extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    // this.cancel = this.cancel.bind(this);
    const course_id = this.props.courses && this.props.courses[0] ? this.props.courses[0].id : '';
    this.state = {
      doc: {
        title: '',
        doc_type: 'fill-in-the-blank',
        course_id,
      },
      submitted: false,
      redirect: false,
      cancel: false
    };
  }

  componentDidMount() {
    this.props.fetchAdminedCourses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted && prevProps.newDocId !== this.props.newDocId) {
      this.setState({redirect: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.courses && nextProps.courses && nextProps.courses[0]) {
      // this sets the default value of the course select element to the
      // first admined course
      const doc = Object.assign({}, this.state.doc);
      doc.course_id = nextProps.courses[0].id;
      this.setState({doc});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/my_created_docs/${this.props.newDocId}/edit`} />;
    }
    if (this.state.cancel) {
      return <Redirect to={'/my_created_docs/'} />;
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
          <select name='course_id' value={this.state.doc.course_id} onChange={this.handleChange}>
            {this.props.courses ? this.props.courses.map( (course, id) => {
                return (
                  <option key={id} value={course.id}>{course.name}</option>
                );
              }) : ''
            }
          </select>
        </div>
        <ButtonRow>
          <button onClick={this.cancel}>Cancel</button>
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

  cancel(event) {
    debugger;
    event.preventDefault();
    this.setState({cancel: true});
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    newDocId: state.newDocId,
    courses: state.courses.adminedCourses
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAdminedCourses: () => dispatch(fetchAdminedCourses()),
  createDocument: doc => dispatch(createDocument(doc))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDoc);
