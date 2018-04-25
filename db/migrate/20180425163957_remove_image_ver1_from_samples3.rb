class RemoveImageVer1FromSamples3 < ActiveRecord::Migration[5.1]
  def change
    remove_column :samples, :image_updated_at, :datetime
  end
end
