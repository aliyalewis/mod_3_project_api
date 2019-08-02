class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name
      t.string :status
      t.integer :likes
      t.string :review
      t.references :user
      t.references :country
      t.timestamps
    end
  end
end
