class Sample < ApplicationRecord
  belongs_to :user
  has_many :category_samples
  has_many :categories, through: :category_samples
  has_many :orders
  has_attached_file :image,
                    styles: { mp3: {} },
                    processors: [:ffmpeg_wav_to_mp3]
  validates_attachment_content_type :image, :content_type => [ 'audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio', 'audio/aiff' , 'audio/wav']

  def as_json

    {
      user_id: user_id,
      id: id,
      name: name, 
      sample_type: sample_type,
      bpm: bpm, 
      key: key, 
      sample_rate: sample_rate, 
      bit_depth: bit_depth,
      image: image.url
      # first_name: user.first_name,
      # last_name: user.last_name
    }
  end

end
 
