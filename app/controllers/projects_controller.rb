class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

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
    @project.card_colour = random_card_colour

    if @project.save
      redirect_to @project, notice: 'Project was successfully created.'
    else
      if @project.errors.any?
        flash[:error] = @project.errors.full_messages
      end

      redirect_to projects_path
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      redirect_to @project, notice: 'Project was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to projects_url, notice: 'Project was successfully destroyed.'
  end

  private
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params[:project].permit(:name, :card_colour)
    end

    def random_card_colour
      colours = %W(#F2C249 #E6772E #4DB3B3 #E64A45 #E64A45)
      colours.sample
    end
end
