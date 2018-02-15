/**
 * Created by 2017 on 11.01.2018.
 */

function createProject(project){


    var projectElem = $('<section>', { class: 'projects', id: 'project-' + project.id});

    var projectHeader = $('<div>', { class: 'project-header clearfix'}).appendTo(projectElem);
    var projectNameGroup = $('<div>', {class:'project-name-group pull-left'}).appendTo(projectHeader);
    var glyphCalendar = $('<span>', {class:'glyphicon glyphicon-calendar'}).appendTo(projectNameGroup);
    var projectName = $('<span>', {class:'project-name', text:' ' + project.name}).appendTo(projectNameGroup);

    var projectOptionsGroup = $('<div>', {class:'project-options-group pull-right'}).appendTo(projectHeader);
    var glyphEdit = $('<span>', {class:'glyphicon glyphicon-edit',

        //when the mouse is released the function is called
        on: {mouseup: function(event){

                var projectId = $(this).parents('.projects').attr('id').split('-')[1];
                var new_name = prompt("Enter the new name of this list");

                if(new_name.length>=2){

                    $.ajax({
                        type: "PUT",
                        url: "/projects/" + projectId,
                        data:{'new_name':new_name},

                        success: function (project) {
                            $('#project-' + project.id).find('.project-name').text(project.name);
                        },
                        error: function (xhr, thrownError) {
                            serverErrors(xhr, thrownError);
                        }
                    });
                }else{
                    alert("Your name of project has less than 2 signs");
                }
            }}
    }).appendTo(projectOptionsGroup);

    var glyphSeparator = $('<span>', {text:' | '}).appendTo(projectOptionsGroup);

    var glyphTrash = $('<span>', {class:'glyphicon glyphicon-trash',
        on: {mouseup: function(event){
                var projectId = $(this).parents('.projects').attr('id').split('-')[1];

                if(confirm("Are you sure?")){
                    $.ajax({
                        type: "DELETE",
                        url: "/projects/" + projectId,

                        success: function (project) {
                            $('#project-' + project.id).remove();
                        },
                        error: function (xhr, thrownError) {
                            serverErrors(xhr, thrownError);
                        }
                    });
                }
            }}
    }).appendTo(projectOptionsGroup);


    var projectMiddle = $('<div>', { class: 'project-middle'}).appendTo(projectElem);
    var projectForm = $('<form>', {class:'form-inline clearfix',

        //Function prevents default behavior - page reloading and sending fomr-data to the server
        on:{
            submit: function(event){
                event.preventDefault();
                $(this).find('[value="Add task"]').click();
                console.log('children-', $(this).children()[1]);
            }
        }
    }).appendTo(projectMiddle);

    var glyphPlus = $('<span>', {class:'glyphicon glyphicon-plus col-md-1 hidden-sm hidden-xs text-center'}).appendTo(projectForm);
    var inputTaskNameWrapper = $('<div>', {class:'col-sm-9 col-md-8 input-task-name-wrapper'}).appendTo(projectForm);
    var inputTaskName = $('<input>', {class:'form-control col-sm-12', type:'text', placeholder:'Start typing here to create a task'}).appendTo(inputTaskNameWrapper);

    var addTaskButton = $('<input>', {class:'btn col-sm-3 col-md-3 float-md-right', type:'button', value:'Add task',
        on :{ click: function(event){
                var projectId = $(this).parents('.projects').attr('id').split('-')[1];
                var nameOfTask = $('#project-'+ projectId +' input[type="text"]').val();

                //calculates position before putting in the page
                var position_id = $('#project-'+projectId+' li').size()+1;

                if(nameOfTask.length>=2){
                    $.ajax({
                        type: "POST",
                        url: "/tasks",
                        data: {name:nameOfTask, project_id:projectId, position_id:position_id},
                        success: function (task) {

                            //After sending task name to the server we have to сlear input field
                            $('#project-'+ projectId +' input[type="text"]').val('');

                            //Creating task in the current project
                            $(createTask({id: task.id, name: task.name})).appendTo('#project-'+ projectId +' .project-tasks-container');
                        },
                        error: function (xhr, thrownError) {
                            serverErrors(xhr, thrownError);
                        }
                    });
                }else{
                    alert("Your name of task has less than 2 signs");
                    $('body form[value="'+ projectId +'"] input[type="text"]').val("");
                }
            }}
    }).appendTo(projectForm);


    var projectFooter = $('<div>', { class: 'project-footer'}).appendTo(projectElem);
    var projectFooterForm = $('<form>').appendTo(projectFooter);

    var tasksList = $('<ul>',{class:'list-unstyled project-tasks-container sortable ui-sortable',
        on :{ mouseover: function(event){
                $( ".sortable" ).sortable({
                    placeholder: "ui-sortable-placeholder",

                    handle: '.glyphicon-move',
                    //This event occurs every time after changing position ends
                    update: function( event, ui ) {
                        //Запрос на обновление позиции таски

                        var thisProject = $(this).parents('.projects')[0];
                        var projectId = $(this).parents('.projects').attr('id').split('-')[1];
                        var tasksInProject = $(this).find('.tasks');
                        var tasks = [];
                        tasksInProject.each(function(index, task){
                            tasks.push({id: $(task).attr('id').split('-')[1].toString(), position: index+1});
                        });
                        console.log('shalala', tasksInProject, 'shalala2');


                        $.ajax({
                            type: "PUT",
                            url: "/tasks/position",
                            data: {tasks:tasks},

                            error: function (xhr, thrownError) {
                                serverErrors(xhr, thrownError);
                            }
                        });
                    }
                });
            }}
    }).appendTo(projectFooterForm);

    return projectElem;
}