class ProjectsController < ApplicationController

  #Getting all projects and nested tasks of current logged in user
  def projects

    @projects = Project.where(user_id: current_user.id)
    render json: @projects, include: ['tasks']
  end

  #Getting name of new project, creating it and returning data of it
  def add_new_project
    @project = Project.create(name: params[:name], user_id: current_user.id)

    render :json => @project.as_json(:only => [:id, :name])
  end

  #Deleting of project
  def delete_project
    @project = Project.find_by(id: params[:id])
    @project.destroy

    render :json => @project.as_json(:only => [:id])
  end

  #Updating of project
  def edit_project
    @project = Project.find_by(id: params[:id])
    @project.update(name: params[:new_name])
    render :json => @project.as_json(:only => [:id, :name])
  end


end
