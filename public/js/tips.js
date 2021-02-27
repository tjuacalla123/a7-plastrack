$( document ).ready(function() {
    $('.section').each(function() {
        var descDiv = $(this).children('.descriptions');
       descDiv.hide(); // Sets initial desc to hide. You can alternatively do this via css such that all .desc { display: none; }.
        var titleDiv = $(this).children('.tip-titles'); // Remove if you do not want to hide original text upon toggling
        $(this).click(function(e) {
             descDiv.toggle();
            // titleDiv.toggle(); // Remove if don't want to hide title upon toggling
        });
    });
});