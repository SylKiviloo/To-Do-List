$(document).ready(function () {

  var showAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1260',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty(); //empty the form before looping through

        response.tasks.forEach(function (task) { //loop
          $('#todo-list').append('<div class="row"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">or Not</button></div>'); //append tasks to list, then button, then checkbox(move this to first, inside div)
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
      url: 'https://fewd-todolist-api.onrenedr.com/tasks?api_key=1260',
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

   
  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1260',
      success: function (response, textStatus) {
        showAllTasks();
        //console.log(response);
      },

      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id')) //'this' refers to what is being event handled - buttons
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


  $(document).on('change', '.mark-complete', function () { //event handler with callback calling either function
    if (this.checked) {
      markComplete($(this).data('id')); //mark that task id complete if the checkbox is checked
    } else {
      markActive($(this).data('id'));
    }
  });

  showAllTasks();

});