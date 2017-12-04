Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
      resource :user, only: [:create, :show]
      resource :session, only: [:create, :destroy, :show]
      resources :documents
      resources :courses
      resources :course_subscriptions
      resources :worked_documents
    end
  end

  root 'static_pages#root'
end
