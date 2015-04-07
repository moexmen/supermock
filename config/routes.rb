Rails.application.routes.draw do
  root to: 'projects#index'

  devise_for :users
  resources :projects, except: :new

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
end
