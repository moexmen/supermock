require 'rails_helper'
require 'jasmine_rails/save_fixture'

RSpec.configure do |config|
  config.include Devise::TestHelpers, type: :controller
  config.include JasmineRails::SaveFixture
end
