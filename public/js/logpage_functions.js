$(document).ready(function(){
  console.log("ready");
  
  
  // search function/filter
  $(".search-bar").keydown(function(){
    var namePlastic;
    var namePlasticSpaces;
    var filter = $(this).val().toUpperCase();
    $(".single-plastic").each(function(index) {
      namePlastic = this.id;
      namePlasticSpaces = namePlastic.replace(/-/g, ' ');
      if (namePlasticSpaces.toUpperCase().indexOf(filter) > -1) {
        $(this).css("display", "");
      } else {
        $(this).css("display", "none");
      }
    });
  })
  
  
  // add all the plasticTypes that the user created 
  var nameofPlastic;
  var plasticTypes = JSON.parse(sessionStorage.getItem("plastic-types"));
  if (plasticTypes != null) {
    for (var i = 0; i < Object.keys(plasticTypes).length; i++) {
      nameofPlastic = plasticTypes[i]["name"].replace(/\s/g , "-");
      $(".plastic-contents").append("<div class='single-plastic ui-draggable ui-draggable-handle' id=" + 
        nameofPlastic + ">" + plasticTypes[i]["icon"] +"</div>");
    }
  }
});
