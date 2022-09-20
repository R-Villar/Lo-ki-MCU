class UsersController < ApplicationController

    #GET '/users'
    def index 
        render json: User.all, status: :ok
    end

     #GET '/users/:id'
    def show 
        render json: find_user, status: :ok, serializer: UserPostsSerializer
    end

    #POST '/users'
    def create 
        user = User.create!(user_params)
        render json: user, status: :created
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:avatar, :username, :email, :password)
    end
end
