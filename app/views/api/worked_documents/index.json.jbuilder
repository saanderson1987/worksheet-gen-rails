@worked_documents.each do |worked_document|
  json.set! worked_document.id do
    json.partial! 'api/worked_documents/worked_document', worked_document: worked_document
  end
end
