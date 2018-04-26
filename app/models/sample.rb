class Sample < ApplicationRecord
  belongs_to :user
  has_many :category_samples
  has_many :categories, through: :category_samples
  has_many :orders
  has_attached_file :image 
  validates_attachment :image,
    content_type: {
      content_type: ["image/jpeg", "image/gif", "image/png"]
    }


    def json

      {
        id: id,
        name: name, 
        sample_type: sample_type,
        bpm: bpm, 
        key: key, 
        sample_rate: sample_rate, 
        bit_depth: bit_depth,
        image: image
      }
    end
end
 