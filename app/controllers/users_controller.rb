class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: :create

    #GET '/users'
    def index 
        render json: User.all, status: :ok
    end

     #GET '/users/:id'
    def show 
        if current_user
            render json: current_user, status: :ok,  serializer: UserPostsSerializer
            # serializer: UserReviewsSerializer
        else
            render json:{ errors: "No current session stored"}, status: :unauthorized
        end
    end

    #POST '/users'
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    # def find_user
    #     User.find(params[:id])
    # end

    def user_params
        params.permit(:username, :email, :password)
    end
end
