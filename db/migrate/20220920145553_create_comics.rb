class CreateComics < ActiveRecord::Migration[6.1]
  def change
    create_table :comics do |t|
      t.string :title
      t.string :characters
      t.string :images
      t.string :thumbnail
      t.string :creators

      t.timestamps
    end
  end
end
