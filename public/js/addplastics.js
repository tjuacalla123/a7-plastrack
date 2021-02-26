$(document).ready(function(){
  console.log("ready");
  
  $("#create-plastic").click(function(){
    addPlastics();
  })
  
  $(".add-pic").click(function(){
    displayIcons();
  })
  
  $(".bi").click(function (){
    var icon = this.outerHTML;
    $(".camera").empty();
    $(".camera").append(icon);
  })
});




function displayIcons() {
  $(".icon-list").toggle("fast");
}


function addPlastics() {
  var plasticSize = $("#choose-boxes option:selected").val();
  var plasticName = $("#plastic-name").val();
  var plasticIcon = $(".camera").get(0).innerHTML;
  if ($.trim(plasticName) == '') {
    alert('Please give the plastic a name');
  }
  else if (plasticSize == "...") {
    alert('Please pick a size');
  }
  else {
    var plastic = new Plastic(plasticName, plasticSize, plasticIcon);
    var plasticList = [];
    
    if (sessionStorage.getItem("plastic-types") == null) {
      plasticList.push(plastic);
      var serializedPlastic = JSON.stringify(plasticList);
      sessionStorage.setItem("plastic-types", serializedPlastic);
    }
    else {
      var deserializedPlastic = JSON.parse(sessionStorage.getItem("plastic-types"));
      console.log(deserializedPlastic);
      deserializedPlastic.push(plastic);
      sessionStorage.setItem("plastic-types", JSON.stringify(deserializedPlastic));
    }  
  }
  return;
}


class Plastic {
  constructor(name, size, icon) {
    this.name = name;
    this.size = size;
    this.icon = icon;
  }
}
