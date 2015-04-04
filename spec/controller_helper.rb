require 'rails_helper'

RSpec.configure do |config|
  config.include Devise::TestHelpers, type: :controller
end
