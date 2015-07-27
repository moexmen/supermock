class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_action :check_ownership, only: [:show, :edit, :update, :destroy]

  # GET /projects
  def index
    @projects = Project.where(user: current_user).order('created_at DESC')
    @project = Project.new
  end

  # GET /projects/1
  def show
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    @project.user = current_user

    if @project.save
      redirect_to @project, notice: 'Project was successfully created.'
    else
      flash[:error] = @project.errors.full_messages if @project.errors.any?
      redirect_to projects_path
    end
  end

  # PATCH/PUT /projects/1
  def update
    pp project_params
    if @project.update(project_params)
      flash[:notice] = 'Project was successfully updated.'
    else
      flash[:error] = @project.errors.full_messages if @project.errors.any?
    end

    head :ok
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to projects_url, notice: 'Project was successfully deleted.'
  end

  private
    def set_project
      @project = Project.find(params[:id])
    end

    def check_ownership
      unless @project.user == current_user
        flash[:error] = 'You do not have permissions to access the project'
        redirect_to projects_path
      end
    end

    def project_params
      params.require(:project).permit(:name, :platform, :card_colour, :pages)
    end
end
