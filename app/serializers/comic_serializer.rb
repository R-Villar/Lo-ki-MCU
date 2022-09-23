class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :format, :thumbnail, :pageCount
end
