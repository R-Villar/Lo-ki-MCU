Rails.application.routes.draw do
  
  resources :posts
  resources :comics
  resources :users

  get "test", to: "test#test"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
