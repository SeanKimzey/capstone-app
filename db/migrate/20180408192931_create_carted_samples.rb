class CreateCartedSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :carted_samples do |t|
      t.string :status
      t.integer :user_id
      t.integer :sample_id
      t.integer :quantity
      t.integer :order_id

      t.timestamps
    end
  end
end
