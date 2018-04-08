class Category < ApplicationRecord
  has_many :category_samples
  has_many :samples, through: :category_samples
end
