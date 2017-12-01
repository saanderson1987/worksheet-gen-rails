import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAdminedCourses, fetchSubscribedCourses } from '../../actions/course_actions.js';
import shortid from 'shortid';

class DocList extends React.Component {
  constructor(props) {
    super(props);
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
    const courseType = this.props.match.path === '/my_subscribed_docs' ? 'subscribedCourses' : 'adminedCourses';
    const path = this.props.subscribed ? 'my_subscribed_docs' : 'my_created_docs';
    // debugger
    return (
      <div>
        {this.props.courses[courseType] ?
          this.props.courses[courseType].map( course => {
            return (
              <div key={ shortid.generate()}>
                <h3>{course.name}</h3>
                <ul>
                  {course.doc_list.map( (doc) => {
                    return (
                      <li key={ shortid.generate() }>
                        <Link to={`/${path}/${doc.id}`}>{ doc.title }</Link>
                        { this.props.subscribed ? '' :
                        <Link to={`/${path}/${doc.id}/edit`}>    Edit</Link> }
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }) : ''
        }
        {JSON.stringify(this.props.courses[courseType])}
      </div>
    );

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
  fetchSubscribedCourses: () => dispatch(fetchSubscribedCourses())
});

export default connect(mapStateToProps, mapDispatchToProps)(DocList);
