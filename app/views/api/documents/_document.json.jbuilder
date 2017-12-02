# json.extract! document, :id, :owner_id, :title, :doc_type, :instructions, :problems
json.extract! document, *document.attributes.keys
json.course do
  json.id document.course.id
  json.name document.course.name
end
