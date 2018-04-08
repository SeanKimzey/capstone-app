class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :total
      t.integer :subtotal
      t.integer :tax
      t.integer :user_id
      t.integer :carted_sample

      t.timestamps
    end
  end
end
