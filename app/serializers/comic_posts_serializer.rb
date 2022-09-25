class ComicPostsSerializer < ActiveModel::Serializer
	attributes :id, :title, :format, :thumbnail, :pageCount
	has_many :posts
end
