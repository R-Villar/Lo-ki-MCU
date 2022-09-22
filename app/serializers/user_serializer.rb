class UserSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :username, :email, :avatar_url
  
end
