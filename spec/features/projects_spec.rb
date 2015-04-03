require 'feature_helper'

feature 'Projects' do
  let(:user) { FactoryGirl.create(:user_with_project) }
  let(:project) { user.projects.first }

  before do
    login_user(user)
    visit projects_path
  end

  describe 'index page' do
    let(:project_card) { all('.project-card')[1] }

    it 'should show all projects' do
      expect(project_card).to have_content(project.name)
    end

    describe 'new project' do
      before do
        all('.project-card')[0].click
      end

      it 'should open new project modal', js: true do
        expect(find('#project_name').value).to eq ''
        expect(find('#project_modal'))
      end

      it 'should create new project', js: true do
        find('#project_name').set("A different #{project.name}")
        click_button 'Create'
        skip('TODO: check project is created')
      end

      it 'should not create new project (empty name)', js: true do
        click_button 'Create'
        expect(find('.alert')).to have_content "Name can't be blank"
      end

      it 'should not create new project (duplicated name)', js: true do
        find('#project_name').set(project.name)
        click_button 'Create'
        expect(find('.alert')).to have_content 'Name has already been taken'
      end
    end
  end
end