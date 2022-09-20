class PostSerializer < ActiveModel::Serializer
  attributes :id, :comment, :like
  has_one :user
  has_one :comic
end
