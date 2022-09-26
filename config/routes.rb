Rails.application.routes.draw do
  
  resources :posts
  resources :comics
  resources :users

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  get "/api-comics", to: "comics#api_comics"
  # get "/api-search/:value", to: "comics#api_comics_search"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
