export const fetchUserData = (data) => (
  $.ajax({
    method: 'GET',
    url: `api/user`,
    data
  })
);
