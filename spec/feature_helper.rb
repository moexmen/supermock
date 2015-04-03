require 'rails_helper'

include Warden::Test::Helpers
Warden.test_mode!

def login_user(user)
  login_as(user, scope: :user, run_callbacks: false)
end