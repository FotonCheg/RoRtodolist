
$(function(){
    //Function to load all projects after user logged in or reload page
    $.get("/projects", function(projects){

        //In this loop we are getting all projects of user logged in
        projects.map(function (project) {
            $(createProject(project)).appendTo('#projects-container');
            project.tasks.map(function(task){
                $(createTask(task)).appendTo('#project-'+project.id+' .project-tasks-container');

            });

        });


        $('<button>', {class: 'btn pull-center', id: 'add-project-button', text: 'Add toDo list'}).appendTo('#add-project-button-area');

    });

//Function to show error messages from serer
    function serverErrors(xhr, thrownError) {
        var msg = '';
        if (xhr.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (xhr.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (xhr.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (thrownError === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (thrownError === 'timeout') {
            msg = 'Time out error.';
        } else if (thrownError === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + xhr.responseText;
        }
        alert(msg);
    }

//Processing click on add project button
    $("body").delegate("#add-project-button", "mouseup", function (e) {
        var nameOfProject = prompt("Enter the name of your project");
        console.log("clicking");
        if(nameOfProject.length>=2){
            $.ajax({
                type: "POST",
                url: "/projects",
                data:{'name':nameOfProject},

                //id, name from backend
                success: function (project) {
                    createProject( {id:project.id, name: project.name, tasks:[]} ).appendTo('#projects-container');
                },
                error: function (xhr, thrownError) {
                    serverErrors(xhr, thrownError);
                }

            });
        }else{
            alert("Your name of project has less than 2 signs")
        }

    });


});

