class ComicPostsSerializer < ActiveModel::Serializer
	attributes :id, :title, :format, :thumbnail, :pageCount, :api_comic_id
	has_many :posts
end
