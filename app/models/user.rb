class User < ApplicationRecord
    has_many :posts 
    has_many :comics, through: :posts

    has_secure_password

    # validations 
    # validates :email, :username, presence: true, uniqueness: true
    # validates :username, length: { in: 1..30 }
    # validates :password, length: { in: 1..20 }
    
    # has_one_attached :avatar
    # def avatar_url
    #     Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    # end
end
