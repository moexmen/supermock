require 'controller_helper'

describe ProjectsController do
  let(:user) { FactoryGirl.create(:user) }
  let!(:project) { FactoryGirl.create(:project, :platform_desktop, user: user) }

  before do
    sign_in(user)
  end

  describe 'GET index' do
    it 'should assign projects' do
      get :index
      expect(assigns(:projects)[0]).to eq project
    end
  end

  describe 'GET show' do
    it 'should assign project' do
      get :show, id: project.id
      expect(assigns(:project)).to eq project
    end

    it 'should not assign project (not owner)' do
      another_user = FactoryGirl.create(:user)
      another_project = FactoryGirl.create(:project, :platform_desktop, user: another_user)

      get :show, id: another_project.id

      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end
  end

  describe 'POST create' do
    it 'should create new project' do
      expect {
        post :create, project: new_project_hash
      }.to change(Project, :count).by(1)

      expect(response).to redirect_to(project_path(Project.order('created_at').last))
    end

    it 'should not create new project (missing name)' do
      expect {
        post :create, project: new_project_hash(name: '')
      }.to change(Project, :count).by(0)

      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end

    it 'should not create new project (duplicated name)' do
      expect {
        post :create, project: new_project_hash(name: project.name)
      }.to change(Project, :count).by(0)

      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end
  end

  describe 'PUT update' do
    it 'should update project' do
      new_name = Faker::Name.name

      put :update, id: project.id, project: new_project_hash(name: new_name)
      project.reload

      expect(project.name).to eq new_name
      expect(response).to redirect_to(projects_path)
    end

    it 'should not update project (missing name)' do
      existing_name = project.name

      put :update, id: project.id, project: new_project_hash(name: '')
      project.reload

      expect(project.name).to eq existing_name
      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end

    it 'should not update project (duplicated name)' do
      another_project = FactoryGirl.create(:project, :platform_desktop, user: user)
      existing_name = project.name

      put :update, id: project.id, project: new_project_hash(name: another_project.name)
      project.reload

      expect(project.name).to eq existing_name
      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end

    it 'should not update project (not owner)' do
      another_user = FactoryGirl.create(:user)
      another_project = FactoryGirl.create(:project, :platform_desktop, user: another_user)
      existing_name = another_project.name

      put :update, id: another_project.id, project: new_project_hash
      another_project.reload

      expect(another_project.name).to eq existing_name
      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end
  end

  describe 'DELETE destroy' do
    it 'should delete project' do
      expect {
        delete :destroy, id: project.id
      }.to change(Project, :count).by(-1)

      expect(response).to redirect_to(projects_path)
    end

    it 'should not delete project (not owner)' do
      another_user = FactoryGirl.create(:user)
      another_project = FactoryGirl.create(:project, :platform_desktop, user: another_user)

      expect {
        delete :destroy, id: another_project.id
      }.to change(Project, :count).by(0)

      expect(flash[:error]).to be_present
      expect(response).to redirect_to(projects_path)
    end
  end
end