import * as CourseApiUtil from '../util/course_api_util';
import * as UserApiUtil from '../util/user_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_SUBSCRIBED_COURSES = 'RECEIVE_SUBSCRIBED_COURSES';
export const RECEIVE_ADMINED_COURSES = 'RECEIVE_ADMINED_COURSES';
export const RECEIVE_ALL_COURSES = 'RECEIVE_ALL_COURSES';
export const RECEIVE_COURSE = 'RECEIVE_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';

export const fetchSubscribedCourses = () => dispatch => {
  return UserApiUtil.fetchUserData({subscribed_courses: true}).then(courses => dispatch(receiveSubscribedCourses(courses)));
};

export const fetchAdminedCourses = () => dispatch => {
  return UserApiUtil.fetchUserData({admined_courses: true}).then(courses => dispatch(receiveAdminedCourses(courses)));
};

export const fetchCourses = (data) => dispatch => {
  return CourseApiUtil.fetchCourses(data).then(courses => dispatch(receiveAllCourses(courses)));
};

export const fetchCourse = id => dispatch => (
  CourseApiUtil.fetchCourse(id).then(course => dispatch(receiveCourse(course)))
);

export const createCourse = course => dispatch => {
  return CourseApiUtil.createCourse(course).then(newCourse => {
    dispatch(receiveCourse(newCourse));
  });
};

export const updateCourse = course => dispatch => (
  CourseApiUtil.updateCourse(course).then(updatedCourse => dispatch(receiveCourse(updatedCourse)))
);

export const deleteCourse = id => dispatch => (
  CourseApiUtil.deleteCourse(id).then(course => dispatch(removeCourse(course)))
);

const receiveSubscribedCourses = courses => {

  return {
    type: RECEIVE_SUBSCRIBED_COURSES,
    courses
  };
};

const receiveAdminedCourses = courses => {

  return {
    type: RECEIVE_ADMINED_COURSES,
    courses
  };
};

const receiveAllCourses = courses => {

  return {
    type: RECEIVE_ALL_COURSES,
    courses
  };
};

export const receiveCourse = course => ({
  type: RECEIVE_COURSE,
  course
});

const removeCourse = course => ({
  type: REMOVE_COURSE,
  course
});
