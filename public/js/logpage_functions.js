$(document).ready(function(){
  console.log("ready");
  
  
  // submit and move move data to log done
  $(".recycling-bin").click(function() {
    sessionStorage.setItem("logCount", sessionStorage.getItem("countItems"));
    sessionStorage.removeItem("countItems");
    window.location.replace("/logdone");
  })
  
  // search function/filter
  $(".search-bar").keydown(function() {
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
  

  // default plastics
  var defaultPlastics = ["<i class='bi bi-cup'></i>", "<i class='bi bi-bag'></i>", "<i class='bi bi-cup-straw'></i>", "<i class='bi bi-cup-fill'></i>"];
  var defaultNames = ["Plastic-Cup", "Plastic-Bag", "Soda-cup", "Coffee"];
  
  for (var i = 0; i < 4; i++) {
    console.log(defaultNames[i]);
    $(".plastic-contents").prepend("<div class='single-plastic' id=" + 
      defaultNames[i] + ">" + defaultPlastics[i] +"</div>");
      $("#"+defaultNames[i]+".single-plastic").append("<p id=" + 
        defaultNames[i] + ">" + defaultNames[i].replace(/-/g, ' ') +"</p>");
  }
  
  
  // add all the plasticTypes that the user created 
  var nameofPlastic;
  var plasticTypes = JSON.parse(sessionStorage.getItem("plastic-types"));
  if (plasticTypes != null) {
    for (var i = 0; i < Object.keys(plasticTypes).length; i++) {
      nameofPlastic = plasticTypes[i]["name"].replace(/\s/g , "-");
      $(".plastic-contents").prepend("<div class='single-plastic' id=" + 
        nameofPlastic + ">" + plasticTypes[i]["icon"] +"</div>");
        $("#"+nameofPlastic+".single-plastic").append("<p id=" + 
          nameofPlastic + ">" + plasticTypes[i]["name"] +"</p>");
    }
  }
});
