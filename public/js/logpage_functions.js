$(document).ready(function(){
  console.log("ready");
  
  // go to additem page
  $("#additem").click(function() {
    window.location.replace("/additem");
  });
  
  // submit and move move data to log done
  $(".recycling-bin").click(function() {
    sessionStorage.removeItem("countItems");
    var logCount = [];
    $(".divider").each(function(){
      var plastic = $(this).data("plasticObject");
      if (plastic != "undefined") {
        plastic["date"] = moment().format('YYYY MM DD');
        logCount.push(plastic);
      }  
    });
    sessionStorage.setItem("logged", JSON.stringify(logCount));
    window.location.replace("/logdone");
  })
  
  // search function/filter
  $(".search-bar").keydown(function() {
    var namePlastic;
    var namePlasticSpaces;
    var filter = $(this).val().toUpperCase();
    $(".single-plastic").each(function(index) {
      namePlastic = $(this).find("p").get(0).innerHTML;
      namePlasticSpaces = namePlastic.replace(/-/g, ' ');
      if (namePlasticSpaces.toUpperCase().indexOf(filter) > -1) {
        $(this).css("display", "");
      } else {
        $(this).css("display", "none");
      }
    });
  })
  
  // toggle delete button, disables dragging function
  $('#deleteitem').click( function() {
    console.log("yo!");
    $(".single-plastic").toggleClass("deleteable");
    if ($(document).find(".deleteable").length > 0) {
      $(".single-plastic").draggable({disabled: true});
    }
    else {
      $(".single-plastic").draggable({disabled: false});
    }
  })
  
  // delete a plastic type
  $(document).on("click", ".deleteable", function() {
    var plastic = $(this).data("plasticObject");
    $(this).remove();
    var plasticTypes = JSON.parse(sessionStorage.getItem("plastic-types"));
    console.log(plasticTypes[1]);
    for (i in plasticTypes) {
      if (equalPlastics(plastic, plasticTypes[i])) {
        delete plasticTypes[i];
      }
    }
    plasticTypes = plasticTypes.filter(plastic => plastic !== null);
    sessionStorage.setItem("plastic-types", JSON.stringify(plasticTypes));
  })
  
  
  
  function equalPlastics(this_plastic, other) {
    return (this_plastic.name == other.name && this_plastic.size == other.size && this_plastic.icon == other.icon);
  }
});