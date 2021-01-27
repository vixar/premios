
/**
* Theme:  Zircos Admin Template
* Author: Coderthemes
* Dashboard 2
*/

! function($) {
	"use strict";

	var FlotChart = function() {
		this.$body = $("body")
		this.$realData = []
	};

	//creates plot graph
	FlotChart.prototype.createPlotGraph = function(selector, data1, data2, data3, labels, colors, borderColor, bgColor) {
		//shows tooltip
		function showTooltip(x, y, contents) {
			$('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css({
				position : 'absolute',
				top : y + 5,
				left : x + 5
			}).appendTo("body").fadeIn(200);
		}


		$.plot($(selector), [{
			data : data1,
			label : labels[0],
			color : colors[0]
		}, {
			data : data2,
			label : labels[1],
			color : colors[1]
		},{
			data : data3,
			label : labels[2],
			color : colors[2]
		}], {
			series : {
				lines : {
					show : true,
					fill : true,
					lineWidth : 2,
					fillColor : {
						colors : [{
							opacity : 0.5
						}, {
							opacity : 0.9
						},{
							opacity : 0.9
						}]
					}
				},
				points : {
					show : false
				},
				shadowSize : 0
			},

			grid : {
				hoverable : true,
				clickable : true,
				borderColor : borderColor,
				tickColor : "#f9f9f9",
				borderWidth : 1,
				labelMargin : 10,
				backgroundColor : bgColor
			},
			legend : {
				position : "ne",
				margin : [0, -24],
				noColumns : 0,
				labelBoxBorderColor : null,
				labelFormatter : function(label, series) {
					// just add some space to labes
					return '' + label + '&nbsp;&nbsp;';
				},
				width : 30,
				height : 2
			},
			yaxis : {
				axisLabel: "Daily Visits",
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			xaxis : {
				axisLabel: "Last Days",
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			tooltip : true,
			tooltipOpts : {
				content : '%s: %y postulantes para la version %x',
				shifts : {
					x : -60,
					y : 25
				},
				defaultTheme : false
			}
		});
	},
	//end plot graph




	//creates Donut Chart
	FlotChart.prototype.createDonutGraph = function(selector, labels, datas, colors) {
		var data = [{
			label : labels[0],
			data : datas[0]
		}, {
			label : labels[1],
			data : datas[1]
		}, {
			label : labels[2],
			data : datas[2]
		}, {
			label : labels[3],
			data : datas[3]
		}];
		var options = {
			series : {
				pie : {
					show : true,
					innerRadius : 0.7
				}
			},
			legend : {
				show : true,
				labelFormatter : function(label, series) {
					return '<div style="font-size:14px;">&nbsp;' + label + '</div>'
				},
				labelBoxBorderColor : null,
				margin : 50,
				width : 20,
				padding : 1
			},
			grid : {
				hoverable : true,
				clickable : true
			},
			colors : colors,
			tooltip : true,
			tooltipOpts : {
				content : "%s, %p.0%"
			}
		};

		$.plot($(selector), data, options);
	},

	//initializing various charts and components
	FlotChart.prototype.init = function() {
		//plot graph data
		var uploads = [[2005, 23], [2006, 33], [2007, 22], [2008, 23], [2009, 21], [2010, 16], [2011, 28],[2012, 12], [2013, 50], [2014, 30], [2015, 72], [2016, 80], [2017, 55]];
        var downloads = [[2005, 2], [2006, 4], [2007, 7], [2008, 12], [2009, 6], [2010, 3], [2011, 10], [2012, 8], [2013, 5], [2014, 14], [2015, 10], [2016, 10], [2017, 0]];
        var downloads1 = [[2005, 1], [2006, 3], [2007, 6], [2008, 9], [2009, 4], [2010, 2], [2011, 8], [2012, 6], [2013, 4], [2014, 10], [2015, 8], [2016, 14], [2017, 0]];
		var plabels = ["Premio Nacional", "Premio Provincial","Premio Interno"];
		var pcolors = ['#4bd396', '#f5707a','#188ae2'];
		var borderColor = '#f5f5f5';
		var bgColor = '#fff';
		this.createPlotGraph("#website-stats", uploads, downloads, downloads1, plabels, pcolors, borderColor, bgColor);


		//Donut pie graph data
		var donutlabels = ["2014", "2015", "2016", "2017"];
		var donutdatas = [18, 27, 27, 22];
		var donutcolors = ['#ff9800', '#8d6e63', "#26a69a", "#3ac9d6"];
		this.createDonutGraph("#donut-chart #donut-chart-container", donutlabels, donutdatas, donutcolors);
	},

	//init flotchart
	$.FlotChart = new FlotChart, $.FlotChart.Constructor =
	FlotChart

}(window.jQuery),

//initializing flotchart
function($) {
	"use strict";
	$.FlotChart.init()
}(window.jQuery);

