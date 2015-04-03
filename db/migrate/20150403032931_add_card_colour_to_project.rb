class AddCardColourToProject < ActiveRecord::Migration
  def change
    add_column :projects, :card_colour, :string
  end
end
