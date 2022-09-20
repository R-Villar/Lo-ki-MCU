class ComicsController < ApplicationController


    #GET '/comics'
    def index 
        render json: Comic.all, status: :ok
    end

    def show
        render json: find_comic, status: :ok, serializer: ComicPostsSerializer
    end

    private

    def find_comic
        Comic.find(params[:id])
    end
end
