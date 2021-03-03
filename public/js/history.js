
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// get data from localStorage
	var dataset = JSON.parse(localStorage.getItem("data"));
	if dataset != null {
		today(dataset);
	}
	
	
})	


function today(dataset) {
	// generate today's stats
	var statsStuff = {};

	var today = dataset[moment().format('YYYY MM DD')];
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
	var modified = [];
	for (i in statsStuff) {
		minCount
		var withName = statsStuff[i];
		withName.push(i);
		modified.push(withName);
	}
	var counts = modified.map(function(value) { 
		return value[0]; 
	});
	var maxCount = Math.max.apply(Math,counts);
	var minCount = Math.min.apply(Math,counts);
	bubbleChart(modified, minCount, maxCount);
	
}

function lastXDays(dataset) { // not done yet
	var statsStuff = {};
	var allData = dataset;
	var keyArr = Object.keys(allData);
	var sorted  = keyArr.sort((a,b) => new moment(a).format('YYYY MM DD') - new moment(b).format('YYYY MM DD'));
	for (log in allToday) {
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
	var modified = [];
	for (i in statsStuff) {
		minCount
		var withName = statsStuff[i];
		withName.push(i);
		modified.push(withName);
	}
	var counts = modified.map(function(value) { 
		return value[0]; 
	});
	var maxCount = Math.max.apply(Math,counts);
	var minCount = Math.min.apply(Math,counts);
}







function bubbleChart(dataset, minDomain, maxDomain) {
	
	console.log($(".graph-box").css("height"));
	console.log($(".graph-box").css("width"));
	var width = $(".graph-box").css("width");
	var height = $(".graph-box").css("height");
	var svg = d3.select(".graph-box")
			.append("svg")
			.attr("height", height)
			.attr("width", width)
			.append("g")
			.attr("transform", "translate(0,0)")
			.attr("height", height)
			.attr("width", width);
			
	// decides positioning of circles	
	var simulation = d3.forceSimulation()
			.force("x", d3.forceX(345/2).strength(1))
			.force("y", d3.forceY(345/2).strength(1))
			.force("collide", d3.forceCollide(function(d) {
				return radiusScale(d[0])
			}))
	
	var radiusScale = d3.scaleSqrt().domain([minDomain, maxDomain]).range([30,50])
	
	var circles = svg.selectAll(".plastic")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("class","plastic")
			.attr("r", function(d) {
				return radiusScale(d[0])
			})
			.attr("fill", "lightblue");
			
	simulation.nodes(dataset)
			.on('tick', ticked)
			
	function ticked() {
		circles
			.attr("cx", function(d) {
				return d.x;
			})
			.attr("cy", function(d) {
				return d.y;
			});
	}
}
