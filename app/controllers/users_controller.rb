class UsersController < ApplicationController
  
  def create
    user = User.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    password: params[:password],
    password_confirmation: params[:password_confirmation],
    image: params[:image]
    )

    if user.save 
      render json: {message: 'User created successfully'}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def show
    render json: current_user.as_json
  end


end                                                                                                         