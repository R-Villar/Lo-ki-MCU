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
        user = current_user
        comic = Comic.find_or_create_by( comic_params )

        post = Post.new( post_params )
        post.user_id = user.id
        post.comic_id = comic.id
        post.save

        render json: post, status: :created
    end

    #PATCH '/posts/:id'
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
        params.permit(:comment, :like)
    end

    def comic_params
        params.permit(:title, :format, :thumbnail, :pageCount)
    end

    def find_post
        Post.find(params[:id])
    end

end
