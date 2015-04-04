class AddPlatformDefaultValueToProject < ActiveRecord::Migration
  def change
    remove_column :projects, :platform
    add_column :projects, :platform, :integer, default: 0
  end
end
