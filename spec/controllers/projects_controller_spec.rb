require 'rails_helper'

describe ProjectsController do

  describe "GET /projects" do

    it "gets all projects with its data" do

      #First i create user, sign in in Devise, create project and send to it user's id, otherwise project will not bundle to any user
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user)
      sign_in(user, scope: :user)
      project = FactoryGirl.create(:project, user_id: user.id)


      get :projects
      expect(response).to be_success
    end
  end

  describe "POST /projects?{name:'Home'}"
    it "creates new project by name" do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user)
      sign_in(user, scope: :user)

      #Sending request for creating project
      post :add_new_project, xhr: true, params: {name: 'Home'}

    @expected = {
        :id => 1,
        :name => 'Home'
    }.to_json

      response.body.should == @expected
    end

  describe "DELETE /projects?{id:1}"
  it "deletes project by ID" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    #Sending request for deleting project
    delete :delete_project, xhr: true, params: {id: project.id}

    @expected = {
        :id => project.id
    }.to_json

    response.body.should == @expected
  end

  describe "PUT /projects/{id:1}"
  it "updates project's name by ID" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in(user, scope: :user)
    project = FactoryGirl.create(:project, user_id: user.id)

    #Sending request for updating project name
    put :edit_project, xhr: true, params: {id: project.id, new_name: 'New Name'}

    #creating json expected result to compare it with data from server
    @expected = {
        :id => project.id,
        :name => 'New Name'
    }.to_json

    response.body.should == @expected
  end
end
