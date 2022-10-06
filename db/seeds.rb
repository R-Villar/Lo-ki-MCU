# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'


# User.destroy_all
# Post.destroy_all
# Comic.destroy_all

puts "creating seeds"

# 20.times do User.create(
#     username: Faker::Name.unique.name,
#     email: Faker::Internet.email,
#     password: '12345')
# end

25.times do Post.create(
    comment: Faker::Lorem.sentence,
    like: 5,
    user_id: rand(1..50),
    comic_id: rand(1..10)
)
end



# 5.times do Comic.create(
#     title: Faker::Book.title,
#     characters: Faker::DcComics.hero,
#     images: Faker::Avatar.image,
#     thumbnail: Faker::Avatar.image,
#     creators: Faker::DcComics.name 
# )
# end


puts "done"