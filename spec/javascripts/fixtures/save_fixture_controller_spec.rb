require 'controller_helper'
require 'jasmine_rails/save_fixture'

RSpec.configure do |config|
  config.include JasmineRails::SaveFixture
end

describe 'ProjectsController', type: :controller do
  render_views

  let(:user) { FactoryGirl.create(:user) }
  let!(:project) { FactoryGirl.create(:project, :platform_desktop, user: user) }

  before do
    @controller = ProjectsController.new
    sign_in(user)
  end

  describe 'GET show' do
    render_views

    it 'should save fixture for js specs' do
      get :show, id: project.id
      save_fixture 'projects/show.html', response.body
    end
  end
end