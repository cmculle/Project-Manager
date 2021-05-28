 am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 5;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
	
    chart.dataSource.url = "scheduleData.json";
	chart.dataSource.parser = new am4core.JSONParser();
       
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
	categoryAxis.renderer.fontSize = 12
	categoryAxis.renderer.fontFamily = "Arial"
	categoryAxis.renderer.minGridDistance = 1
	categoryAxis.renderer.frequency = 1

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.opposite = true;
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 30;
	dateAxis.renderer.fontSize = 12
	dateAxis.renderer.fontFamily = "Arial"
    dateAxis.baseInterval = {
      count: 1,
      timeUnit: "day"
    };
	
    dateAxis.max = new Date(2020, 0, 1, 24, 0, 0, 0).getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

	//Create Series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
	series1.columns.template.propertyFields.height = "height";
    series1.clustered = false;
	series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";
	// Set tooltip text font and size
	series1.tooltip.label.fontSize = 12;
	series1.tooltip.label.fontFamily="Arial";
	//It looks like the only way to get different column sizes is to create a different series
	

    series1.dataFields.openDateX = "fromDate";
    series1.dataFields.dateX = "toDate";
    series1.dataFields.categoryY = "name";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
	//next line does not work
	
    series1.columns.template.strokeOpacity = .5;
	series1.columns.template.column.cornerRadiusTopRight = 3;
	series1.columns.template.column.cornerRadiusBottomRight = 3;
	
    chart.scrollbarX = new am4core.Scrollbar();
	chart.scrollbarX.parent = chart.bottomAxesContainer;

  }); // end am4core.ready()
