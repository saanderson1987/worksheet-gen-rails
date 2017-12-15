import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAdminedCourses, fetchSubscribedCourses, deleteDocFromList } from '../../actions/course_actions.js';
import shortid from 'shortid';
import Loading from '../ui/loading.jsx';
import Course from './course.jsx';

class DocList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.match.path);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.path !== this.props.match.path) {
      this.fetchData(nextProps.match.path);
    }
  }

  fetchData(path) {
    if (path === '/my_subscribed_docs') {
      this.props.fetchSubscribedCourses();
    } else {
      this.props.fetchAdminedCourses();
    }
  }

  render() {
    const subscribed = this.props.match.path === '/my_subscribed_docs';
    const courseType = subscribed ? 'subscribedCourses' : 'adminedCourses';
    const path = subscribed ? 'my_subscribed_docs' : 'my_created_docs';

    if (!this.props.courses[courseType]) return <Loading />;

    return (
      <div className='contents-container'>
        {this.props.courses[courseType].map( (course, courseIdx) => {
          return (
            <Course key={ shortid.generate()} course={course}
              courseIdx={courseIdx} deleteDocument={this.deleteDocument}
              subscribed={subscribed}/>
          );
        })}
      </div>
    );
  }

  deleteDocument(id, courseIdx, docIdx) {
    return (event) => {
      this.props.deleteDocFromList(id, courseIdx, docIdx);
    };
  }

}

const mapStateToProps = state => {
  return {
    courses: state.courses,
    currentUser : state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAdminedCourses: () => dispatch(fetchAdminedCourses()),
  fetchSubscribedCourses: () => dispatch(fetchSubscribedCourses()),
  deleteDocFromList: (id, courseIdx, docIdx) => dispatch(deleteDocFromList(id, courseIdx, docIdx))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocList);
