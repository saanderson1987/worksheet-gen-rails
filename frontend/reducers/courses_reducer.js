import {
  RECEIVE_SUBSCRIBED_COURSES,
  RECEIVE_ADMINED_COURSES,
  REMOVE_DOC_FROM_LIST,
  RECEIVE_ALL_COURSES,
  RECEIVE_COURSE,
  REMOVE_COURSE,
} from '../actions/course_actions';
import merge from 'lodash/merge';

const CoursesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  const newState = merge({}, oldState);
  switch (action.type) {
    case REMOVE_DOC_FROM_LIST:
      newState.adminedCourses[action.courseIdx].doc_list.splice(action.docIdx, 1);
      return newState;
    case RECEIVE_SUBSCRIBED_COURSES:
      return merge({}, oldState, {subscribedCourses: action.courses.subscribed_courses});
    case RECEIVE_ADMINED_COURSES:
      return merge({}, oldState, {adminedCourses: action.courses.admined_courses});
    // case RECEIVE_ALL_COURSES:
    //   return merge({}, action.courses);
    case RECEIVE_COURSE:
      return merge({}, oldState, {[action.doc.id]: action.doc});
    case REMOVE_COURSE:
      delete newState[action.doc.id];
      return newState;
    default:
      return oldState;
  }
};

export default CoursesReducer;
