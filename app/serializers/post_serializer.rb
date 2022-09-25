class PostSerializer < ActiveModel::Serializer
  attributes :id, :comment, :like , :user
  has_one :user
  has_one :comic
end
