class PostSerializer < ActiveModel::Serializer
  attributes :id, :comment, :like
  has_one :user
end
