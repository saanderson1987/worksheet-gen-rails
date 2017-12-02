@documents.each do |document|
  # json.set! document.id do
  #   json.extract! document, *document.attributes.keys
  # end
  json.set! document.id do
    json.partial! 'api/documents/document', document: document
  end
end
