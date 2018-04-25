class RemoveImageVer1FromSamples2 < ActiveRecord::Migration[5.1]
  def change
    remove_column :samples, :image_content_type, :string
    remove_column :samples, :image_file_size, :integer
  end
end
