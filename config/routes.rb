Rails.application.routes.draw do
  resources :countries
  resources :trips
  resources :users

  get 'countries/:id/rev', to: 'countries#reviews'
end
