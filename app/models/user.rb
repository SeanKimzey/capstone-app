class User < ApplicationRecord
  has_secure_password
  has_many :samples
  has_many :orders
  has_many :carted_samples
  validates :email, presence: true, uniqueness: true
  has_attached_file :image
  validates_attachment :image,
    content_type: {
      content_type: ["image/jpeg", "image/gif", "image/png"]
    }
  validates :image, presence: true


  def as_json
    {
      first_name: first_name,
      last_name: last_name,
      email: email, 
      image: image.url
    }
  end

end
