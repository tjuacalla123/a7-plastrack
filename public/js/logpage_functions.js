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
  
  $(document).on("click", ".divider", function() {
    alert("you won");
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // add all the plasticTypes that the user created 
  var nameofPlastic;
  var plasticTypes = JSON.parse(sessionStorage.getItem("plastic-types"));
  if (plasticTypes != null) {
    for (var i = 0; i < Object.keys(plasticTypes).length; i++) {
      nameofPlastic = plasticTypes[i]["name"].replace(/\s/g , "-");
      $(".plastic-contents").append("<div class='single-plastic' id=" + 
        nameofPlastic + ">" + plasticTypes[i]["icon"] +"</div>");
        $("#"+nameofPlastic+".single-plastic").append("<p id=" + 
          nameofPlastic + ">" + plasticTypes[i]["name"] +"</p>");
    }
  }
});
