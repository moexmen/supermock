require 'feature_helper'

feature 'Projects' do
  let(:user) { FactoryGirl.create(:user) }
  let!(:project_desktop) { FactoryGirl.create(:project, :platform_desktop, user: user) }
  let!(:project_mobile) { FactoryGirl.create(:project, :platform_mobile, user: user) }

  before do
    login_user(user)
    visit projects_path
  end

  describe 'index page' do
    it 'should show all projects' do
      expect(all('.project-card')[1]).to have_content(project_mobile.name)
      expect(all('.project-card')[2]).to have_content(project_desktop.name)
    end

    describe 'new project' do
      before do
        all('.project-card')[0].click
      end

      it 'should open new project modal', js: true do
        expect(find('#project_name').value).to eq ''
        expect(find('#project_platform_desktop')).to be_checked
        expect(find('#project_modal'))
      end

      it 'should create new project', js: true do
        find('#project_name').set('Some new project')
        click_button 'Create'
        skip('TODO: check project is created')
      end

      it 'should not create new project (empty name)', js: true do
        click_button 'Create'
        expect(find('.alert')).to have_content "Name can't be blank"
      end

      it 'should not create new project (duplicated name)', js: true do
        find('#project_name').set(project_desktop.name)
        click_button 'Create'
        expect(find('.alert')).to have_content 'Name has already been taken'
      end
    end

    describe 'update project' do
      before do
        open_project_mobile_modal
      end

      it 'should open project modal', js: true do
        test_project_modal_values(project_mobile)
      end

      it 'should update project', js: true do
        project_mobile.name = "#{project_mobile.name} #{project_desktop.name}"
        project_mobile.desktop!

        find('#project_name').set(project_mobile.name)
        find('#project_platform_desktop').set(true)
        click_button 'Save'

        expect(all('.project-card')[1]).to have_content(project_mobile.name)
        open_project_mobile_modal
        test_project_modal_values(project_mobile)
      end

      it 'should not update project (empty name)', js: true do
        find('#project_name').set('')
        click_button 'Save'

        expect(find('.alert')).to have_content "Name can't be blank"
      end

      it 'should not update project (duplicated name)', js: true do
        find('#project_name').set(project_desktop.name)
        click_button 'Save'

        expect(find('.alert')).to have_content 'Name has already been taken'
      end

      def open_project_mobile_modal
        all('.project-card')[1].right_click
        all('#project_dropdown_menu a')[0].click
      end

      def test_project_modal_values(project)
        expect(find('#project_name').value).to eq project.name
        expect(find("#project_platform_#{project.platform}")).to be_checked
        expect(find('#project_modal'))
      end
    end

    describe 'delete project' do
      it 'should delete project', js: true do
        all('.project-card')[1].right_click
        all('#project_dropdown_menu a')[1].click
        click_button 'Delete'

        expect(find('.alert')).to have_content 'Project was successfully deleted'
      end
    end
  end
end