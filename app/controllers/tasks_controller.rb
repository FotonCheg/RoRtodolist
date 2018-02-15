class TasksController < ApplicationController

  #---------------------------------------------Here will we tasks

  #Adding new task to project by project_id
  def add_new_task_to_project
    @project = Project.find_by(id: params[:project_id])
    @task = Task.create(name: params[:name], position: params[:position_id], project_id: params[:project_id])

    render :json => @task.as_json(:only => [:id, :name, :project_id])
  end

  #Updating name of task
  def edit_task
    puts 'edit task method'
    @task = Task.find_by(id: params[:id])
    @task.update(name: params[:new_name])

    render :json => @task.as_json(:only => [:id, :name])
  end

  #Changing of tasks position

  def change_position

    puts params[:tasks].to_json

    @tasksvalues =  params[:tasks].values.map do |task|
      @task = Task.find_by(id: task[:id])
      @task.update(position:task[:position])
    end



  end

  #Checking / unckecking task as complete
  def complete_task
    @task = Task.find_by(id: params[:id])
    puts @task.id, @task.status
    if @task.status == 0
      @task.update(status: 1)
    else
      @task.update(status: '0')
    end

    render :json => @task.as_json(:only => [:id, :status])
  end

  #Setting an expiration date
  def expired_task
    @task = Task.find_by(id: params[:id])
    @task.update(deadline: params[:date])

    render :json => @task.as_json(:only => [:deadline])
  end

  #Deleting task by it's id
  def delete_task
    @task = Task.find_by(id: params[:id])
    @task.destroy
    render :json => @task.as_json(:only => [:id])
  end


end
