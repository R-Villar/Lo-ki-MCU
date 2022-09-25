class Comic < ApplicationRecord
    has_many :posts
    has_many :users, through: :posts

    # number of posts to display
    def number_of_posts
        self.posts.length
    end

end
