Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'

  get '/projects' => 'projects#projects'
  post '/projects' => 'projects#add_new_project'
  delete '/projects/:id' => 'projects#delete_project'
  put 'projects/:id' => 'projects#edit_project'

  put '/tasks/position' => 'tasks#change_position'
  post '/tasks' => 'tasks#add_new_task_to_project'
  put '/tasks/:id' => 'tasks#edit_task'
  put '/tasks/:id/complete' => 'tasks#complete_task'
  put 'tasks/:id/expired' => 'tasks#expired_task'
  delete '/tasks/:id' => 'tasks#delete_task'
end
