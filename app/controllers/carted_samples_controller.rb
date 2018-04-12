class CartedSamplesController < ApplicationController

  def index
    carted_samples = current_user.carted_samples.where(status: "carted")
    render json: carted_samples.as_json
  end

  def create
    sample = Sample.find_by(id: params[:sample_id])
    carted_sample = CartedSample.new(
      user_id: current_user.id,
      sample_id: params[:sample_id],
      quantity: params[:quantity],
      status: "carted"
      ) 
    carted_sample.save
    render json: {message: "You added a new sample to your cart"}
  end

  def destroy
    carted_sample = CartedSample.find_by(id: params[:id])
    carted_sample.delete
    render json: {message: "This sample has been removed from your cart"}
  end

end
