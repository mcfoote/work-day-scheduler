//empty array for tasks
tasks = [];

//grab date info from moment
var today = (moment().format("MMMM D, YYYY"))
$("#currentDay").text(today);

setInterval(function(){hour();},1000*60*60);

//print tasks to screen
var print = function() {

    $.each(tasks, function(list, arr){

        var taskPara = $("<p>").addClass("description task-item-" + list).text(arr)

        $("#task-item-" + list).replaceWith(taskPara);

    })

}

// load tasks from local storage
var load = function() {

    tasks = JSON.parse(localStorage.getItem("tasks"))

    if(!tasks) {
        tasks={};
    };

    print(tasks)

}

//Color task containers
var hourColor = function() {

    var current = moment().hour() 

    //starting at 8:00 cycle through 17:00
    for(var i=8; i<18; i++){

        var taskArea = $("#task-"+i)  

        if(current>i){

            $(taskArea).addClass("past");

        }else if (current === i){

            $(taskArea).addClass("present");

        }else{

            $(taskArea).addClass("future")

        }
    }

}

$(".taskContainer").on("blur", "textarea", function() {
    
    var text = $(this)
      .val()
      .trim();

    var taskPara = $("<p>")
      .addClass("taskItem")
      .text(text);

    $(this).replaceWith(taskPara);

});

//click functionality for task container
$(".taskContainer").on("click", "p", function(){
    
    var text =$(this)
      .text()
      .trim();

    var input =$("<textarea>")
      .addClass("formController")
      .val(text);
  
    $(this).replaceWith(input);
     input.trigger("focus");

});

//Save tasks on click
$(".saveBtn").on("click", function(){
        
          var index = $(".saveBtn").index(this);
        
          tasks[index] = $(this).parent().find(".taskItem").text();
          localStorage.setItem("tasks", JSON.stringify(tasks));
          
});

//function calls
load();
hourColor();