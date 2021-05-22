class Poll < ApplicationRecord
    validates :title, presence: true
    validates :option1, presence: true
    validates :option2, presence: true
    validates :option3, presence: true
    validates :option4, presence: true 
end