
export const fetchCourses = (data) => (
  $.ajax({
    method: 'GET',
    url: '/api/courses',
    data
  })
);

export const fetchCourse = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/courses/${id}`
  })
);

export const createCourse = course => (
  $.ajax({
    method: 'POST',
    url: 'api/courses',
    data: { course }
  })
);

export const updateCourse = course => (
  $.ajax({
    method: 'PATCH',
    url: `api/courses/${course.id}`,
    data: { course }
  })
);

export const deleteCourse = id => (
  $.ajax({
    url: `api/courses/${id}`,
    method: 'DELETE',
  })
);
