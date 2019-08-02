class CreateCountries < ActiveRecord::Migration[5.2]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :location
      t.string :description
      t.integer :likes
      t.timestamps
    end
  end
end
