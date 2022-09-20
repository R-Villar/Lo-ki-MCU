class PostsController < ApplicationController
    
    
    #GET '/posts'
    def index
        render json: Post.all, status: :ok
    end

    #GET '/post/:id'
    def show
        render json: find_post, status: :ok
    end

    #POST '/posts'
    def create
        render json: Post.create!(post_params), status: :created
    end

    #PATCH '/post/:id'
    def update 
        post = find_post
        post.update!(post_params)
        render json: post, status: :accepted
    end

    #DELETE '/post/:id'
    def destroy
        post = find_post
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:user_id, :comic_id, :comment, :like)
    end

    def find_post
        Post.find(params[:id])
    end

end
