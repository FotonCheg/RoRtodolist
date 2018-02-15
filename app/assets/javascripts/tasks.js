/**
 * Created by 2017 on 11.01.2018.
 */
function createTask(task){

    console.log('В функции создания таски', task.id, task.project_id);





    var projectsTask = $('<li>', {class:'tasks', id:'task-'+task.id});
    var checkBoxInput = $('<input>', {type:'checkbox', class:'checking-status', on:{
            mouseup:function(event){
                var taskId = $(this).parents('.tasks').attr('id').split('-')[1];

                $(this).checked = !$(this).checked;
                if(this.checked){
                    $('#task-' + taskId + ' .task-name').css('text-decoration','none');
                }else{
                    $('#task-' + taskId + ' .task-name').css('text-decoration','line-through');
                }

                $.ajax({
                    type: "PUT",
                    url: "/tasks/" + taskId + "/complete",

                    success: function (task) {
                        console.log("success", task.id, ' ', task.status);
                    },
                    error: function (xhr, thrownError) {
                        serverErrors(xhr, thrownError);
                    }
                });
            }
        }}).appendTo(projectsTask);
    //We've created checkbox, but we have to find out if it checked or not

    var taskName = $('<span>', {class:'task-name', text:task.name}).appendTo(projectsTask);
    var taskOptionsGroup = $('<div>', {class:'task-options-group'}).appendTo(projectsTask);

    var deadline = '';
    if( task.deadline!=null ){
        deadline = (task.deadline);
    }

    var datepicker = $('<input>', {class: 'datepicker', type: 'text', value: deadline, id: 'datepicker-' + task.id,

        on:{mouseover: function(event){
                $(".datepicker").datepicker({
                    dateFormat: 'yy-mm-dd',
                    monthNames:
                        ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август",
                            "Сентябрь","Октябрь","Ноябрь","Декабрь"],
                    dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],

                    //Setting of the expiration date
                    onSelect : function(dateText, inst){
                        //taskId
                        var taskId = $(this).parents('.tasks').attr('id').split('-')[1];

                        $.ajax({
                            type: "PUT",
                            url: "/tasks/" + taskId + "/expired",
                            data: {date:dateText},
                            error: function (xhr, thrownError) {
                                serverErrors(xhr, thrownError);
                            }
                        });

                    }
                });
            }}
    }).appendTo(taskOptionsGroup);
    var glyphMoveTask = $('<span>', {class:'glyphicon glyphicon-move'}).appendTo(taskOptionsGroup);
    var glyphEditTask = $('<span>', {class:'glyphicon glyphicon-edit',
        on: {

        //When the mouse is released, we suggest user to enter the new name of task and send it to the server
            mouseup: function(event){
                var taskId = $(this).parents('.tasks').attr('id').split('-')[1];
                var new_name = prompt("Enter the new name of this task");

                if(new_name.length>=2){
                    $.ajax({
                        type: "PUT",
                        url: "/tasks/" + taskId,
                        data: {"new_name":new_name},

                        success: function (task) {
                            $('#task-' + task.id + ' .task-name').text(task.name);
                        },
                        error: function (xhr, thrownError) {
                            serverErrors(xhr, thrownError);
                        }
                    });
                }else{
                    alert("Your name of task has less than 2 signs")
                }
            }
        }
    }).appendTo(taskOptionsGroup);
    var glyphTrashTask = $('<span>', {class:'glyphicon glyphicon-trash',

        //Deleting of the special task by id
        on:{
            mouseup: function(event){
                var taskId = $(this).parents('.tasks').attr('id').split('-')[1];

                if(confirm("Are you sure?")){
                    $.ajax({
                        type: "DELETE",
                        url: "/tasks/" + taskId,

                        success: function (task) {
                            $('#task-' + task.id).remove();
                        },
                        error: function (xhr, thrownError) {
                            serverErrors(xhr, thrownError);
                        }
                    });
                }
            }
        }
    }).appendTo(taskOptionsGroup);

    if(task.status==1){
        checkBoxInput.attr('checked', 'checked');
        $(taskName).css('text-decoration','line-through');
    }

    return projectsTask;
}