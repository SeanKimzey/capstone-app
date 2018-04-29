class Sample < ApplicationRecord
  belongs_to :user
  has_many :category_samples
  has_many :categories, through: :category_samples
  has_many :orders
  has_attached_file :image
  validates_attachment_content_type :image, :content_type => ['audio/mp3', 'audio/mpeg']


  def as_json

    {
      id: id,
      name: name, 
      sample_type: sample_type,
      bpm: bpm, 
      key: key, 
      sample_rate: sample_rate, 
      bit_depth: bit_depth,
      image: image.url,
      the: "hello"
  
    }
  end

end
 
