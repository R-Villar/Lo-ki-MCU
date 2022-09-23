class ComicsController < ApplicationController
    skip_before_action :authenticate_user

    #GET '/comics'
    # def index 
    #     render json: Comic.all, status: :ok
    # end

    def index
        # ts = DateTime.now.strftime('%Q')
        # baseUrl = 'https://gateway.marvel.com/v1/public/comics'
        # apiPublicKey = ENV['MARVEL_PUBLIC_API_KEY']
        # apiPrivateKey = ENV['MARVEL_PRIVATE_KEY']

        # newString = ts + apiPrivateKey + apiPublicKey
        # hash = Digest::MD5.hexdigest(newString)
        # url = "#{baseUrl}?ts=#{ts}&apikey=#{apiPublicKey}&hash=#{hash}&titleStartsWith=#{"THOR"}" #&titleStartsWith=#{"THOR"}

        r = RestClient.get(fetch_url)
        json = JSON.parse(r.body)
        # byebug 
        render json: json['data']['results']
        # json['data']['results'].map { |comic| comic['title']}

    end


    def show
        render json: find_comic, status: :ok, serializer: ComicPostsSerializer
    end

    private

    def comic_params
        params.permit(:title, :format, :thumbnail, :pageCount)
    end

    def fetch_url
        ts = DateTime.now.strftime('%Q')
        baseUrl = 'https://gateway.marvel.com/v1/public/comics'
        apiPublicKey = ENV['MARVEL_PUBLIC_API_KEY']
        apiPrivateKey = ENV['MARVEL_PRIVATE_KEY']
        newString = ts + apiPrivateKey + apiPublicKey
        hash = Digest::MD5.hexdigest(newString)
        url = "#{baseUrl}?ts=#{ts}&apikey=#{apiPublicKey}&hash=#{hash}&titleStartsWith=#{"thor"}" #&titleStartsWith=#{"THOR"}
    end

    def find_comic
        Comic.find(params[:id])
    end
end
