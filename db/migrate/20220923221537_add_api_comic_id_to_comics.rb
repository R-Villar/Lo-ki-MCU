class AddApiComicIdToComics < ActiveRecord::Migration[6.1]
  def change
    add_column :comics, :api_comic_id, :integer
  end
end
