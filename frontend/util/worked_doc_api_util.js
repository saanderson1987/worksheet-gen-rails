export const fetchWorkedDocs = (data) => (
  $.ajax({
    method: 'GET',
    url: '/api/worked_documents',
    data
  })
);

export const fetchWorkedDoc = (docId) => (
  $.ajax({
    method: 'GET',
    url: `api/worked_documents/${docId}`
  })
);

export const createWorkedDoc = worked_document => (
  $.ajax({
    method: 'POST',
    url: 'api/worked_documents',
    data: { worked_document}
  })
);

export const updateWorkedDoc = worked_document => (
  $.ajax({
    method: 'PATCH',
    url: `api/worked_documents/${worked_document.id}`,
    data: { worked_document }
  })
);

export const deleteWorkedDoc = id => (
  $.ajax({
    url: `api/worked_documents/${id}`,
    method: 'DELETE',
  })
);
