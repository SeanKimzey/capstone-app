class CreateCategorySamples < ActiveRecord::Migration[5.1]
  def change
    create_table :category_samples do |t|
      t.integer :category_id
      t.integer :sample_id

      t.timestamps
    end
  end
end
