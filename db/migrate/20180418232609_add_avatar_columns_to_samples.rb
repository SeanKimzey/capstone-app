class AddAvatarColumnsToSamples < ActiveRecord::Migration[5.1]
  def up
    add_attachment :samples, :avatar
  end
end

def down
  remove_attachment :samples, :avatar
end