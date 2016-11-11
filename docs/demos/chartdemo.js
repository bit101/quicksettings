var data = [];
for(var i = 0; i < 20; i++) {
	data.push(Math.random() * 1);
};

var pieData = [];
for(var i = 0; i < 8; i++) {
	pieData.push(Math.random());
}


var lineChart = Charts.lineChart
	.create()
	.setLineWidth(2)
	.setStrokeStyle("red")
	.setBackgroundColor("#ccccff")
	.setData(data);

var barChart = Charts.barChart
	.create()
	.setSpacing(3)
	.setBarColor("blue")
	.setData(data);

var pieChart = Charts.pieChart
	.create()
	.setSort(true)
	.setData(pieData);

var donutChart = Charts.pieChart
	.create()
	.setSort(true)
	.setData(pieData)
	.setDonut(50);

var panel = QuickSettings.create(10, 10)
	.addElement("line chart", lineChart.getElement())
	.addElement("bar chart", barChart.getElement())
	.addElement("pie chart", pieChart.getElement())
	.addElement("donut chart", donutChart.getElement())
	.addRange("donut hole", 0, 80, 50, 1, function(value) {
		donutChart.setDonut(value);
	});
