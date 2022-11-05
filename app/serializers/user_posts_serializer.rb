class UserPostsSerializer < ActiveModel::Serializer
	attributes :id, :username, :email, :posts, :avatar_url
	has_many :posts
end
