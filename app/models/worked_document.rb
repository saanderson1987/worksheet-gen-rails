class WorkedDocument < ApplicationRecord
  validates :doc_id, :user_id, presence: true
  validates :doc_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :document, class_name: 'Document', foreign_key: :doc_id

  def set_problems
    problems = self.document.problems.deep_dup
    word_bank = []
    self.document.problems.each do |problem_idx, problem|
      problem['textPieces'].each do |text_piece_idx, text_piece|
        if text_piece['blank'] == 'true'
          problems[problem_idx]['textPieces'][text_piece_idx]['text'] = ''
          word_bank << text_piece['text']
        end
      end
    end
    self.problems = problems
    self.word_bank = word_bank
  end
end
