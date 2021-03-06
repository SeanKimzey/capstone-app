Rails.application.routes.draw do

   # users routes

  post "/users" => "users#create"
  post "/user_token" => "user_token#create"
  get "/current_user" => "users#show"

   # samples routes 

  get "/samples" => "samples#index"
  get "/drums" => "samples#drums"
  get "/guitar" => "samples#guitar"
  get "/bass" => "samples#bass"
  get "/keys" => "samples#keys"
  get "/vox" => "samples#vox"
  get "/misc" => "samples#misc"
  get "/samples/:id" => "samples#show"
  post "/samples" => "samples#create" 
  post "/samples/:id" => "samples#update"
  delete "/samples/:id" => "samples#destroy"

  

  # carted samples routes

  post "/carted_samples" => "carted_samples#create"
  get "/carted_samples" => "carted_samples#index"
  delete "/carted_samples" => "carted_samples#delete"






    
end