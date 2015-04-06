class ChangeProjectContentToPages < ActiveRecord::Migration
  def change
    remove_column :projects, :content
    add_column :projects, :pages, :text
  end
end
