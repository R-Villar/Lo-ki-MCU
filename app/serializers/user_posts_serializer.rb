class UserPostsSerializer < ActiveModel::Serializer
	attributes :id, :avatar, :username, :email, :posts 
	has_many :posts
end
