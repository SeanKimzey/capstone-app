Rails.application.routes.draw do
  get "/samples" => "samples#index"
  get "/samples/:id" => "samples#show"
  post "/samples" => "samples#create" 
  post "/samples/:id" => "samples#update"
  delete "/samples/:id" => "samples#destroy"

  post "/users" => "users#create"
end