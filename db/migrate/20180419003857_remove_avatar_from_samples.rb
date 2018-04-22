class RemoveAvatarFromSamples < ActiveRecord::Migration[5.1]
  def change
    remove_attachment :samples, :avatar
  
  end
end
