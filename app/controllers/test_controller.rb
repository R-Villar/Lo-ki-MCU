class TestController < ApplicationController

    
    # return MD5(ts + secretKey + publicKey).toString()
    # `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&titleStartsWith=${"hulk"}`
    def test
        # render plain: "hello"

        # ts = DateTime.now.strftime('%Q')
        # baseUrl = 'https://gateway.marvel.com/v1/public/comics'
        # apiPublicKey = ENV['MARVEL_PUBLIC_API_KEY']
        # apiPrivateKey = ENV['MARVEL_PRIVATE_KEY']

        # newString = ts + apiPrivateKey + apiPublicKey
        # hash = Digest::MD5.hexdigest(newString)
        # url = "#{baseUrl}?ts=#{ts}&apikey=#{apiPublicKey}&hash=#{hash}&titleStartsWith=#{"THOR"}"

        # r = RestClient.get(url)
        # json = JSON.parse(r.body)
        # render json:  json['data']['results']
    end
end
