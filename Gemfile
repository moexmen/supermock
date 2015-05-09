source 'https://rubygems.org'

ruby '2.2.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.1'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 3.2'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Fix turbolinks for jquery
gem 'jquery-turbolinks'

## Custom
# For authentication
gem 'devise'
# Use slim instead of erb
gem 'slim-rails'
# Form helper
gem 'simple_form'
# Use bootstrap
gem 'bootstrap-sass', '~> 3.3.4'
# Autoprefix browser for css
gem 'autoprefixer-rails'
# For pretty logging
gem 'illegal_logger', git: 'https://estl.moe/stash/scm/ilog/illegal_logger.git'
# For javascript and css easy structuring
gem 'rails_utils'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  ## Custom
  # Rspec test
  gem 'rspec-rails'
  # For easy spin up of models
  gem 'factory_girl_rails'
  # For generating fake data
  gem 'faker'
  # For UI testing
  gem 'capybara'
  # For launching browser for test that rely on javascript
  gem 'selenium-webdriver'
  # For testing using chrome
  gem 'chromedriver-helper'
  # Bullet gem is designed to help you increase your application's performance by reducing the number of queries it makes
  gem 'bullet'
  # For front-end javascript testing
  gem 'jasmine-rails'
end

## Custom
group :test do
  # To clean up database because we are not using transactional fixtures in test because of selenium web driver
  gem 'database_cleaner'
end