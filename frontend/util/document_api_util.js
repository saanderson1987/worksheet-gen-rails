
export const fetchDocuments = (data) => (
  $.ajax({
    method: 'GET',
    url: '/api/documents',
    data
  })
);

export const fetchDocument = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/documents/${id}`
  })
);

export const createDocument = doc => (
  $.ajax({
    method: 'POST',
    url: 'api/documents',
    data: { doc }
  })
);

export const updateDocument = doc => (
  $.ajax({
    method: 'PATCH',
    url: `api/documents/${doc.id}`,
    data: { doc }
  })
);

export const deleteDocument = id => (
  $.ajax({
    url: `api/documents/${id}`,
    method: 'DELETE',
  })
);
