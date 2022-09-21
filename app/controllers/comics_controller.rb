class ComicsController < ApplicationController


    #GET '/comics'
    # def index 
    #     render json: Comic.all, status: :ok
    # end

    def index 
        ts = DateTime.now.strftime('%Q')
        baseUrl = 'https://gateway.marvel.com/v1/public/comics'
        apiPublicKey = ENV['MARVEL_PUBLIC_API_KEY']
        apiPrivateKey = ENV['MARVEL_PRIVATE_KEY']

        newString = ts + apiPrivateKey + apiPublicKey
        hash = Digest::MD5.hexdigest(newString)
        url = "#{baseUrl}?ts=#{ts}&apikey=#{apiPublicKey}&hash=#{hash}&titleStartsWith=#{"THOR"}" #&titleStartsWith=#{"THOR"}

        r = RestClient.get(url)
        json = JSON.parse(r.body)
        render json:  json['data']['results']
    end




    def show
        render json: find_comic, status: :ok, serializer: ComicPostsSerializer
    end

    private

    def find_comic
        Comic.find(params[:id])
    end
end
