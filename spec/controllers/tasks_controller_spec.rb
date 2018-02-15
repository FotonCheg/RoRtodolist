require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "POST /tasks?{name:'New Task Name', position:7, project_id:project.id"
  it "creates new task in project of current user" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    #Sending request to add new task
    post :add_new_task_to_project, xhr: true, params: {name:"New Task Name", position: 7, project_id: project.id}

    @expected = {
        :id => project.id,
        :name => "New Task Name",
        :project_id => project.id
    }.to_json

    response.body.should == @expected
  end

  describe "PUT /tasks?{id:1, new_name:'New Task Name'}"
  it "changes task name" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)
    task = FactoryGirl.create(:task, project_id:project.id)

    #Sending request to updating the task by id
    put :edit_task, xhr: true, params: {id:task.id, new_name:"New Task Name"}

    @expected = {
        :id => task.id,
        :name => "New Task Name",
    }.to_json

    response.body.should == @expected
  end

  describe "PUT /tasks?{tasks:tasks}"
  it "changes task's position" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)
    task = FactoryGirl.create(:task, project_id:project.id)
    task2 = FactoryGirl.create(:task, project_id:project.id)

    tasks = { 0 => {:id => task.id, :position => task2.position}, 1 => {:id => task2.id, :position => task.position} }

    #Changing positions of task in special project by task id
    put :change_position, xhr: true, params: {tasks: tasks}

    expect(response).to be_success
  end


  describe "post /tasks?{id:1}"
  it "marks task as complete" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    task = FactoryGirl.create(:task, project_id:project.id)

    #Sending request to check or unckeck task by it's id
    post :complete_task, xhr: true, params: {id: task.id}

    @expected = {
        :id => task.id,
        :status => 1
    }.to_json

    response.body.should == @expected
  end

  describe "POST /tasks?{id:1, date:'2018-05-17'}"
  it "assigns expiration date of task" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    task = FactoryGirl.create(:task, project_id:project.id)

    #Sending request to setting expiration date of task by it's id
    post :expired_task, xhr: true, params: {id: task.id, date: '2018-05-17'}

    @expected = {
        :deadline => '2018-05-17'
    }.to_json

    response.body.should == @expected
  end

  describe "DELETE /tasks?{id:1}"
  it "removes task by id" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    task = FactoryGirl.create(:task, project_id:project.id)

    #Sending request to remove task by it's id
    delete :delete_task, xhr: true, params: {id: task.id}

    @expected = {
        :id => task.id
    }.to_json

    response.body.should == @expected
  end

end
