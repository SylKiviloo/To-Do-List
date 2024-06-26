$(document).ready(function () {

  var showAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1260',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty(); //empty the form before looping through

        response.tasks.forEach(function (task) {
          $('#todo-list').prepend('<div class="row task"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">or Not</button>');
        })
        console.log(response);
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
        console.log(response);
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

   
  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1260',
      success: function (response, textStatus) {
        showAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'))
  });


  var markComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1260',
      dataType: 'json',
      success: function (response, textStatus) {
        showAllTasks();
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var markActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1260',
      dataType: 'json',
      success: function (response, textStatus) {
        showAllTasks();
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  
  $(document).on('change', '.mark-complete', function () { 
    if (this.checked) {
      markComplete($(this).data('id')) 
      var row = $(this).parent();
      row.fadeOut(1500);  
    } else {
      markActive($(this).data('id'))
    }
  });

  showAllTasks();

});