class Post < ApplicationRecord
  belongs_to :user
  belongs_to :comic

  # validates :comment, length: { in: 1..30 }
end
