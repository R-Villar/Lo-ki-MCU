class User < ApplicationRecord
    has_many :posts 
    has_many :comics, through: :posts

    has_secure_password
    has_one_attached :avatar


    def avatar_url
        Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    end
end
