
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// get data from localStorage
	var dataset = JSON.parse(localStorage.getItem("data"));
	if (dataset != null) {
		var statsToday = today(dataset);
		var stats7days = lastXDays(dataset, 7);
		var stats30days = lastXDays(dataset, 30);
		
		var last7line = parseProgress(stats7days[1]);
		var last30line = parseProgress(stats30days[1]);
		
		var modified = [];
		for (i in statsToday) {
			var withName = statsToday[i];
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
	
	$(".plastic").on("click", function(){
		console.log($("svg").data());
	})
	lineChart(stats7days);
})

function today(dataset) {
	// generate today's stats
	var statsStuff = {};
	var todays = dataset[moment().format('YYYY MM DD')];
	for (log in todays) {
		var allLogs = todays[log]; // very fast runtime
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
	return statsStuff;
}

function lastXDays(dataset, days) { // not done yet
	var statsX = {};
	var totals = {};
	var sizetotals = [];
	var allData = dataset;
	var smallcount = 0;
	var mediumcount = 0;
	var largecount = 0;
	for (date in allData) {
		var todaydate = moment(date).format('MM/DD/YYYY');
		var lastx = moment().subtract(days, 'days').format('MM/DD/YYYY')
		//var bruh = lastx.day(-7);
		if (moment(todaydate).isAfter(lastx)) {
			var logDate = allData[date]
			var datecount = 0;
			for (log in logDate) {
				var allLogs = logDate[log];
				for (session in allLogs) {
					var plastic = allLogs[session];
					var keyName = plastic["name"] + " ("+ plastic["size"] +")";
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



function parseProgress(data) {
	var dateList = [];
	var amountList = [];
	for (date in data) {
		dateList.push(date);
		amountList.push(data[date]);
	}
	return []
}

function lineChart(data, chartType) {
	var lineData = data[1];
	var dateList = [];
	var amountList = [];
	for (date in lineData) {
		dateList.push(date);
		amountList.push(lineData[date]);
	}
	
	var chart = $("#linegraph");
	var barChart = new Chart(chart, {
	
		type: 'line',
		data: {
			labels: dateList,
			datasets: [{
				label: 'Amount of plastics',
				data: amountList
			}]
		},
		options: {
			
		},
		
	});
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
