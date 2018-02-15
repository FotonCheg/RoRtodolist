require 'rails_helper'

RSpec.describe MainController, type: :controller do
  describe "GET /index" do

    it "renders index template" do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user)
      sign_in(user, scope: :user)

      get :index

      expect(response).to render_template :index
    end
  end
end
