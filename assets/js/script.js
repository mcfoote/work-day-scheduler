tasks = [];

var load = function() {

    tasks = JSON.parse(localStorage.getItem("tasks"))

    if(!tasks) {
        tasks={};
    };

    print(tasks)

}

var print = function() {

    $.each(tasks, function(list, arr){

        var taskP = $("<p>").addClass("description task-item-" + list).text(arr)

        $("#task-item-" + list).replaceWith(taskP);

    })

}

var hour = function() {
    var currentHour = moment().hour() 

    for(var i=8; i<18; i++){
        var taskArea = $("#task-"+i)  
        if(currentHour>i){
            $(taskArea).addClass("past");
        } else if (currentHour === i){
            $(taskArea).addClass("present");
        }else{
            $(taskArea).addClass("future")
        }
    }

}

$(".taskContainer").on("click", "p", function(){
    
    var text =$(this)
      .text()
      .trim();
    var input =$("<textarea>")
      .addClass("form-control")
      .val(text);
  
    $(this).replaceWith(input);
     input.trigger("focus");

  });

$(".taskContainer").on("blur", "textarea", function() {
    
    var text = $(this)
      .val()
      .trim();

    var taskP = $("<p>")
      .addClass("taskItem")
      .text(text);

    $(this).replaceWith(taskP);

});

$(".saveBtn").on("click", function(){
        
          var index = $(".saveBtn").index(this);
        
          tasks[index] = $(this).parent().find(".taskItem").text();
          localStorage.setItem("tasks", JSON.stringify(tasks));
});

var today = (moment().format("MMMM D, YYYY"))
$("#currentDay").text(today);

setInterval(function(){hour();},1000*60*60);

load();
hour();