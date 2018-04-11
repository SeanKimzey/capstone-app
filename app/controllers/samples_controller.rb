class SamplesController < ApplicationController

  def index
    samples = Sample.all
    render json: samples.as_json
  end

  def show
    sample = Sample.find_by(id: params[:id])
    render json: sample.as_json
  end

  def create
    sample = Sample.create(
      name: "Drum3",
      user_id: 1,
      sample_type: "sampletest",
      bpm: 160,
      key: "n/a",
      sample_rate: "96khz",
      bit_depth: "24bit",
      audio_sample: "sefkmkref"
      )
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

end
