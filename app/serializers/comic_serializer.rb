class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :format, :thumbnail, :pageCount, :number_of_posts #, :posts 
  has_many :posts

end
