json.extract! document, :id, :owner_id, :title, :doc_type, :instructions, :problems
json.updated_at document.updated_at.to_formatted_s(:iso8601)
