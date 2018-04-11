class User < ApplicationRecord
  has_many :samples
  has_many :orders
  has_many :carted_samples
  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end
