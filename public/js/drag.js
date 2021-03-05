//Adapted from ahsteele on Stack Overflow
var totalPlastics = 0;
var smallPlastics = 0;
var mediumPlastics = 0;
var largePlastics = 0;
$(document).ready(function(){
  
  // removes a log group, on() is for elements that are appended after page loads.
  $(document).on("click", ".cross", function() {
    var names = $(this).parent().find(".p-text").attr('id');
    var count = +$(this).parent().find(".p-num").text();
    $(this).parent().remove();
    var allCounts = JSON.parse(sessionStorage.getItem("countItems"));
    totalPlastics -= allCounts[names];
    
    $(".totals").find("#total-plastic").html(totalPlastics + " total plastics logged");
    delete allCounts[names];
    sessionStorage.setItem("countItems", JSON.stringify(allCounts));
  });
  
  // drag and drop
  $(function() { 
      var countItems = {};
      sessionStorage.setItem("countItems", JSON.stringify(countItems));
      $( ".single-plastic" ).draggable({
          appendTo: $("#homepage"),
          helper: "clone",
          revert:  function(dropped) {
              var dropped = dropped && dropped[0].id == "droppable";
              return !dropped;
           } 
       }).each(function() {
           var top = $(this).position().top;
           var left = $(this).position().left;
           $(this).data('orgTop', top);
           $(this).data('orgLeft', left);
      }); 
  
       $(".recycling-bin").droppable({
          activeClass: 'ui-state-hover',
          hoverClass: 'ui-state-active',
          drop: function(event, ui) {
              var draggable = ui.draggable;
              var tempCount = JSON.parse(sessionStorage.getItem('countItems'))
              if (tempCount == null) {
                tempCount = {};
              }
              var id = draggable.attr("id");
              var name =  draggable.find("p")[0].innerHTML;
              if (id in tempCount) {
                tempCount[id] += 1;
              }
              else {
                tempCount[id] = 1;
              }
              
              sessionStorage.setItem("countItems", JSON.stringify(tempCount));    
              $(this).addClass('ui-state-highlight').find('p').html(name + ' has been added to the bin!');
              
              if($("#loggedTemp").find("#"+id).length == 0) {
                $("#loggedTemp").append("<div class='divider' id="+id+"></div>");
                $("#"+id+".divider").append("<div class='p-text' id="+id+">"+name+"</div>");
                $("#"+id+".divider").append("<div class='p-num' id="+id+">"+tempCount[id]+"</div>");
                $("#"+id+".divider").append("<div class='cross' id="+id+">"+ "&#9747;" + "</div>");
                
                var plasticData = draggable.data("plasticObject");
                plasticData["count"] = 1;
              }
              else {
                $("#"+id+".p-num").html(tempCount[id]);
                var plasticData = $("#"+id+".divider").data("plasticObject");
                plasticData["count"] += 1;
                
              }
              $("#"+id+".divider").data("plasticObject", plasticData);
              totalPlastics++;
              $(".totals").find("#total-plastic").html(totalPlastics + " total plastics logged");
          },
  
      });
  });
  
  
})
 
