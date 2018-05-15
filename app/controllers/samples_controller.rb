class SamplesController < ApplicationController

  def index
    samples = Sample.all
    p "***********"
    p current_user
    p "***********"
    render json: samples.as_json

  end

  def show
    sample = Sample.find_by(id: params[:id])
    render json: sample.as_json
  end

  def create
    sample = Sample.new(
      user_id: current_user.id, 
      name: params[:name], 
      sample_type: params[:sample_type],
      bpm: params[:bpm], 
      key: params[:key], 
      sample_rate: params[:sample_rate], 
      bit_depth: params[:bit_depth],
      image: params[:image]
     )

    sample.save
    p sample.errors.full_messages
    render json: {message: "You added a new sample"}

  end

  def update
    sample = Sample.find_by(id: params[:id])
    sample.update(
      audio_sample: "this will be added later"
      )
    render json: {message: "You have updated this sample"}
  end

  def destroy
    sample = Sample.find_by(id: params[:id])
    sample.delete
    render json: {message: "This sample has been deleted"}
  end

  def drums
    samples = Sample.all.order(:id).where("sample_type LIKE ?","%Drums%")
    render json: samples.as_json
  end

  def guitar
    samples = Sample.all.order(:id).where("sample_type LIKE ?","%Guitar%")
    render json: samples.as_json
  end

  def bass
    samples = Sample.all.order(:id).where("sample_type LIKE ?","%Bass%")
    render json: samples.as_json
  end

  def keys
    samples = Sample.all.order(:id).where("sample_type LIKE ?","%Keys%")
    render json: samples.as_json
  end

  def vox
    samples = Sample.all.order(:id).where("sample_type LIKE ?","%Vox%")
    render json: samples.as_json
  end

end


