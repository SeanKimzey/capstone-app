class RemoveImageVer1FromSamples < ActiveRecord::Migration[5.1]
  def change
    remove_column :samples, :image_file_name, :string
  end
end
