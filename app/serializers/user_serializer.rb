class UserSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :username, :email
  
end
