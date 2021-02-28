$(document).ready(function() {
  var plasticData = JSON.parse(sessionStorage.getItem("logged"));
  var plasticObjects = JSON.parse(sessionStorage.getItem("plastic-types"));
  
  
  var plastic;
  var totalSmall = 0;
  var totalMedium = 0;
  var totalLarge = 0;
  var totalCount = 0;
  var id = 0;
  for (i in plasticData) {
    plastic = plasticData[i]
    var count = plastic["count"]
    totalCount += count;
    if (plastic["size"] == "small") {
      totalSmall += count;
    }
    else if (plastic["size"] == "medium") {
      totalMedium += count;
    }
    else if (plastic["size"] == "large") {
      totalLarge += count;  
    }
    var name = plastic["name"];
    var size = plastic["size"];
    $(".list-plastics").append("<div class='divider' id="+id+"></div>");
    $("#"+id+".divider").append("<div class='p-text' id="+id+">"+name+" ("+size+")"+"</div>");
    $("#"+id+".divider").append("<div class='p-num' id="+id+">"+count+"</div>");
    id++;
  }
  
  $(".large").html(totalLarge);
  $(".medium").html(totalMedium);
  $(".small").html(totalSmall);
  $(".total-logged").html(totalCount);
})