class CreateComics < ActiveRecord::Migration[6.1]
  def change
    create_table :comics do |t|
      t.string :title
      t.string :format
      t.string :thumbnail
      t.integer :pageCount

      t.timestamps
    end
  end
end
