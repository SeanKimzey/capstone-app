class User < ApplicationRecord
  has_many :samples
  has_many :orders
  has_many :carted_samples
end
