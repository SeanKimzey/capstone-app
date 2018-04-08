class ChangeSampleTypeName < ActiveRecord::Migration[5.1]
  def change
    rename_column :samples, :type, :sample_type
  end
end
