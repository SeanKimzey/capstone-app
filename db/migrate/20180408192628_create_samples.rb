class CreateSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :samples do |t|
      t.string :name
      t.string :user_id
      t.string :type
      t.integer :bpm
      t.string :key
      t.string :sample_rate
      t.string :bit_depth
      t.string :audio_sample

      t.timestamps
    end
  end
end
