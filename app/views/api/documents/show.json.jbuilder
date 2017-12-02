# json.extract! @document, *@document.attributes.keys

json.partial! 'api/documents/document', document: @document
