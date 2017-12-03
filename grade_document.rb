def grade_document(doc)
  key = Document.find(doc[doc_id])
  results = doc.deep_dup
  key[problems].each_with_index do |problem, prob_idx|
    problem[text_pieces].each_with_index do |text_piece, text_piece_idx|
      if text_piece[blank] == true || text_piece[blank] == 'true'
        result = results[problems][prob_idx][text_pieces][text_piece_idx]
        if result[text] == text_piece[text]
          result[correct] = true
        else
          result[correct] = false
        end
      end
    end
  end
  results
end
