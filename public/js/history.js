
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// load circles 
	var data = JSON.parse(localStorage.getItem("data"));
	console.log(data);
	var statsStuff = {};
	// generate today's stats
	var today = data[moment().format('YYYY MM DD')];
	for (log in today) {
		var allLogs = today[log]; // very fast runtime
		for (item in allLogs) {
			var plastic = allLogs[item];
			var keyName = plastic["name"] + " ("+ plastic["size"] +")";
			var val = statsStuff[keyName];
			if (val == undefined) {
				statsStuff[keyName] = [plastic["count"], plastic["size"]]
			}
			else {
				statsStuff[keyName][0] += plastic["count"];
			}
		}
	}
	
console.log(statsStuff);
	
	//$("<circle>", {id: "foo", "class": "a"});
	
	
	
})

/*
(function() {
	var height = 500;
	var width = 500;
	var svg = d3.select(".graph-box")
		.append("svg")
		.attr("height", height);
		.attr("width", width);
		.append("g")
		.attr("transform", "translate(0,0)")
})
*/
