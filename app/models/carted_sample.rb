class CartedSample < ApplicationRecord
  belongs_to :sample 
  belongs_to :order
  belongs_to :user
end
