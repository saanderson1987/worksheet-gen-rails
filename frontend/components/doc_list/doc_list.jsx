import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAdminedCourses, fetchSubscribedCourses, deleteDocFromList } from '../../actions/course_actions.js';
import shortid from 'shortid';

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
    const courseType = this.props.match.path === '/my_subscribed_docs' ? 'subscribedCourses' : 'adminedCourses';
    const path = this.props.subscribed ? 'my_subscribed_docs' : 'my_created_docs';
    if (!this.props.courses) return <Loading />;
    return (
      <div>
        {this.props.courses[courseType] ?
          this.props.courses[courseType].map( (course, courseIdx) => {
            return (
              <div key={ shortid.generate()}>
                <h3>{course.name}</h3>
                <ul>
                  {course.doc_list.map( (doc, docIdx) => {
                    return (
                      <li key={ shortid.generate() }>
                        <Link to={`/${path}/${doc.id}`}>{ doc.title }</Link>
                        { this.props.subscribed ? '' :
                          <div>
                            <Link to={`/${path}/${doc.id}/edit`}>    Edit</Link>
                            <button onClick={this.deleteDocument(doc.id, courseIdx, docIdx)}>Delete</button>
                          </div>
                        }

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
