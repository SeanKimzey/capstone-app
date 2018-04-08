class Sample < ApplicationRecord
  belongs_to :user
  has_many :category_samples
  has_many :categories, through: :category_samples
  has_many :orders
end
