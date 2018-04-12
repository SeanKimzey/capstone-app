class CartedSample < ApplicationRecord
  belongs_to :sample 
  belongs_to :order, optional: true
  belongs_to :user
end
