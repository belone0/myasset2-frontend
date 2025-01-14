Rails.application.routes.draw do
  resources :balancings do
    resources :balancing_assets, only: [:index, :create]
  end
  resources :balancing_assets, only: [:update, :destroy]
  
  resources :todos
  resource :session
  resources :passwords, param: :token

  resource :users, only: [] do
    get :me, on: :collection
    post :create, on: :collection
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.www
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
