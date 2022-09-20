class UserSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :username, :email, :password_digest
end
