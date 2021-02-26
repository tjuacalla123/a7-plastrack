//Adapted from ahsteele on Stack Overflow
$( function() { 
    var loggedItems = [];
    sessionStorage.setItem("loggedItems", JSON.stringify(loggedItems));
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
            var id = draggable.attr("id");
            $(this).addClass('ui-state-highlight').find('p').html(id + ' has been added to the bin!');
            tempItems = JSON.parse(sessionStorage.getItem('loggedItems'))
            tempItems.push(id)
            sessionStorage.setItem("loggedItems", JSON.stringify(tempItems));
            var loggedTemp=document.getElementById("loggedTemp"); 
            var i=tempItems.length-1; 
            loggedTemp.innerHTML+=(tempItems[i]+"<br/>" );         
        },

    });
} ); 
