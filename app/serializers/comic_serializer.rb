class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :characters, :images, :thumbnail, :creators
end
