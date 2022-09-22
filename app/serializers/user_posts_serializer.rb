class UserPostsSerializer < ActiveModel::Serializer
	attributes :id, :username, :email, :posts 
	has_many :posts
end
