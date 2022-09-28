class ComicPostsSerializer < ActiveModel::Serializer
	attributes :id, :title, :format, :thumbnail, :pageCount
	has_many :posts
	has_many :users
end
