class UsersController < ApplicationController
  
  def create
    user = User.create!(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    password: params[:password],
    password_confirmation: params[:password_confirmation]
    )

    if user.save 
      sample = Sample.new(
      user_id: user.id, 
      name: params[:name], 
      sample_type: params[:sample_type],
      bpm: params[:bpm], 
      key: params[:key], 
      sample_rate: params[:sample_rate], 
      bit_depth: params[:bit_depth],
      image: params[:image]
     )
      sample.save
      render json: {message: 'User created successfully'}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end

      
  end

  def show
    render json: current_user.as_json
  end


end                                                                                                         