$(document).ready(function () {

  var showAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1260',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty(); //empty the form before looping through
        response.tasks.forEach(function (task) { //loop
          $('#todo-list').append('<p>' + task.content + '</p>'); //append tasks to list
        })
        //console.log(response);
      },

      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1260',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-input').val()
        }
      }),
      success: function (response, textStatus) {
        //console.log(response);
        $('#new-task-input').val(''); //add it to the list
        showAllTasks();
      },

      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('#add-task').on('submit', function (event) { //event handler
    event.preventDefault(); //default is page reload
    createTask();
  });

  showAllTasks();

});