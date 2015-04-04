class AddPlatformToProject < ActiveRecord::Migration
  def change
    add_column :projects, :platform, :integer
  end
end
