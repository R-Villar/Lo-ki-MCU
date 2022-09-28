Rails.application.routes.draw do
  
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  resources :comics, only: [:index, :show]
  resources :users, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  get "/api-comics", to: "comics#api_comics"
  get "/api-search/:value", to: "comics#api_comics_search"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
