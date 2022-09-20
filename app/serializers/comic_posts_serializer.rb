class ComicPostsSerializer < ActiveModel::Serializer
	attributes :id, :title, :characters, :images, :thumbnail, :creators
	has_many :posts
end
