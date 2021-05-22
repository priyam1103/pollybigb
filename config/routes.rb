Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :sessions, only: %i[create destroy]
  resources :polls
  resources :users, only: %i[create index]
  put "/polls/vote/:id" => "polls#vote"
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
