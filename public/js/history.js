
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// get data from localStorage
	var dataset = JSON.parse(localStorage.getItem("data"));
	if (dataset != null) {
		
		// datasets
		var statsToday = today(dataset);
		var stats7days = lastXDays(dataset, 7);
		var stats30days = lastXDays(dataset, 30);
		
		
		// plastic day by day 
		var last7line = parseProgress(stats7days[1]);
		var last30line = parseProgress(stats30days[1]);
		
		
		// plastic frequency
		var todayplastic = parseDict(statsToday);
		var plastic7 = parseDict(stats7days[0]);
		var plastic30 = parseDict(stats30days[0]);
		
		$("#today").click(function() {
			$("#linegraph").data("chart").destroy();$("#linegraph1").data("chart").destroy();
			$("#linegraph").remove();$("#linegraph1").remove();
			$(".graphs").append("<canvas id = linegraph></canvas>");$(".graphs").append("<canvas id = linegraph1></canvas>");
			
			lineChart(todayplastic, 'bar', "#linegraph");
			lineChart(todayplastic, 'bar', "#linegraph1");
		})
		
		$("#week").click(function() {
			$("#linegraph").data("chart").destroy();$("#linegraph1").data("chart").destroy();
			$("#linegraph").remove();$("#linegraph1").remove();
			$(".graphs").append("<canvas id = linegraph></canvas>");$(".graphs").append("<canvas id = linegraph1></canvas>");
			lineChart(plastic7, 'bar', "#linegraph");
			lineChart(last7line, 'line', "#linegraph1");
		})
		
		$("#month").click(function() {
			$("#linegraph").data("chart").destroy();$("#linegraph1").data("chart").destroy();
			$("#linegraph").remove();$("#linegraph1").remove();
			$(".graphs").append("<canvas id = linegraph></canvas>");$(".graphs").append("<canvas id = linegraph1></canvas>");
			
			lineChart(plastic30, 'bar', "#linegraph");
			lineChart(last30line, 'line', "#linegraph1");
			
		})
		
		lineChart(todayplastic, 'bar', "#linegraph");
		lineChart(todayplastic, 'bar', "#linegraph1");
	}
	
})


function lineChart(data, chartType, location) {
	
	var chart = $(location);
	var barChart = new Chart(chart, {
		type: chartType,
		data: {
			labels: data[0],
			datasets: [{
				label: 'Amount of plastics',
				data: data[1]
			}]
		},
		options: {
			responsive: true,
      maintainAspectRatio: false
		},
		
	});
	$(location).data("chart", barChart);
}


function today(dataset) {
	// generate today's stats
	var statsStuff = {};
	var todays = dataset[moment().format('YYYY MM DD')];
	for (log in todays) {
		var allLogs = todays[log]; // very fast runtime
		for (item in allLogs) {
			var plastic = allLogs[item];
			var keyName = plastic["name"]; // + " ("+ plastic["size"] +")";
			var val = statsStuff[keyName];
			if (val == undefined) {
				statsStuff[keyName] = [plastic["count"], plastic["size"]]
			}
			else {
				statsStuff[keyName][0] += plastic["count"];
			}
		}
	}
	return statsStuff;
}

// totals for each plastic, totals for each date, totals for each size 
function lastXDays(dataset, days) { 
	var statsX = {};
	var totals = {};
	var sizetotals = [];
	var allData = dataset;
	var smallcount = 0;	var mediumcount = 0;	var largecount = 0;
	for (date in allData) {
		var todaydate = moment(date).format('MM/DD/YYYY');
		var lastx = moment().subtract(days, 'days').format('MM/DD/YYYY')
		if (moment(todaydate).isAfter(lastx)) {
			var logDate = allData[date]
			var datecount = 0;
			for (log in logDate) {
				var allLogs = logDate[log];
				for (session in allLogs) {
					var plastic = allLogs[session];
					var keyName = plastic["name"]; // + " ("+ plastic["size"] +")";
					var val = statsX[keyName];
					if (val == undefined) {
						statsX[keyName] = [plastic["count"], plastic["size"]]
					}
					else {
						statsX[keyName][0] += plastic["count"];
					}
					
					if (plastic["size"] == "small") {smallcount += plastic["count"];}
					else if (plastic["size"] == "medium") {mediumcount += plastic["count"];}
					else {largecount += plastic["count"];}
					
					datecount += plastic["count"];
				}
			}
			totals[todaydate] = datecount;
		}
		else {
			continue;
		}
	}
	var totalplastics = smallcount + mediumcount + largecount;
	var sizetotals = [smallcount, mediumcount, largecount, totalplastics];
	return [statsX, totals, sizetotals];
}

function parseDict(dict) {
	var items = Object.keys(dict).map(function(key) {
  	return [key, dict[key]];
	});

	items.sort(function(first, second) {
  	return second[1][0] - first[1][0];
	});
	
	var name = items.map(function(val) {
  	return val[0];
	});
	var count = items.map(function(val) {
  	return val[1][0];
	});
	var size = items.map(function(val) {
  	return val[1][1];
	});
	return [name, count, size];
}

function parseProgress(data) {
	var dateList = [];
	var amountList = [];
	for (date in data) {
		dateList.push(date);
		amountList.push(data[date]);
	}
	return [dateList, amountList];
}





//Will implement in the future, not for a7
/*
function parseBubble(data) {
	var modified = [];
	for (i in data) {
		var withName = data[i];
		withName.push(i);
		modified.push(withName);
	}
	var counts = modified.map(function(value) { 
		return value[0]; 
	});
	
	var maxCount = Math.max.apply(Math,counts);
	var minCount = Math.min.apply(Math,counts);
	
	return [modified, minCount, maxCount]; 
}

function bubbleChart(dataset, minDomain, maxDomain) {
	var width = $(".graph-box").css("width");
	var height = $(".graph-box").css("height");
	var svg = d3.select(".graph-box")
			.append("svg")
			.attr("height", height)
			.attr("width", width)
			.append("g")
			.attr("transform", "translate(0,0)");
			
	// decides positioning of circles	
	var simulation = d3.forceSimulation()
			.force("x", d3.forceX(345/2).strength(1))
			.force("y", d3.forceY(345/2).strength(1))
			.force("collide", d3.forceCollide(function(d) {
				return radiusScale(d[0]) + 1 
			}))
	
	var radiusScale = d3.scaleSqrt().domain([minDomain, maxDomain]).range([20,50])
	
	var circles = svg.selectAll(".plastic")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("class","plastic")
			.attr("r", function(d) {
				return radiusScale(d[0])
			})
			.attr("fill", "lightblue")
			
			
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
*/
