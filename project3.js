 am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv3", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
	chart.paddingTop = "0px";
	chart.paddingBottom = "0px";
	chart.svgContainer.htmlElement.style.width = am4core.percent(100);
		
    var colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [{
        name: "Survey",
        fromDate: "2020-01-01",
        toDate: "2021-01-01",
        color: am4core.color("#782f40")
      },
      {
        name: "Survey",
        fromDate: "2020-02-01 12:00",
        toDate: "2021-06-01 15:00",
        color: am4core.color("#782f40")
      },
      {
        name: "Environmental",
        fromDate: "2020-01-01 15:30",
        toDate: "2021-01-01 21:30",
        color: am4core.color("#782f40")
      },

      {
        name: "Environmental",
        fromDate: "2021-02-15 09:00",
        toDate: "2021-02-28",
        color: am4core.color("#782f40")
      },
      {
        name: "Preliminary Design",
        fromDate: "2020-01-01 13:00",
        toDate: "2020-01-01 17:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Final Design",
        fromDate: "2020-06-01 11:00",
        toDate: "2020-08-01 16:00",
        color: am4core.color("#782f40")
      },
      {
        name: "Final Design",
        fromDate: "2020-01-01 16:00",
        toDate: "2020-05-01 19:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Bidding",
        fromDate: "2020-01-01 16:00",
        toDate: "2020-01-01 20:00",
        color: am4core.color("#782f40")
      },
      {
        name: "Bidding",
        fromDate: "2020-01-01 20:30",
        toDate: "2020-01-01 24:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Construction",
        fromDate: "2020-01-01 13:00",
        toDate: "2020-01-01 24:00",
        color: am4core.color("#782f40")
      },
	  
	  {
        name: "Closeout",
        fromDate: "2021-01-01",
        toDate: "2021-05-01",
        color: am4core.color("#782f40")
      }
    ];

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "name";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.fontSize = "9pt"
		categoryAxis.renderer.fontFamily = "Arial";
		categoryAxis.renderer.minGridDistance = 20;
		categoryAxis.renderer.frequency = 1;
		categoryAxis.renderer.gridHeight = 50;
	

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.opposite = true;
		dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
		dateAxis.renderer.minGridDistance = 30;
		dateAxis.renderer.fontSize = "9pt";
		dateAxis.renderer.fontFamily = "Arial";
		dateAxis.baseInterval = {count: 1, timeUnit: "day"};
		dateAxis.max = new Date(2022, 12, 31, 0, 0, 0).getTime();
		dateAxis.strictMinMax = true;
		dateAxis.renderer.tooltipLocation = 0;
	
	//Create Series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
		series1.columns.template.height = am4core.percent(60);
		series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";

		series1.dataFields.openDateX = "fromDate";
		series1.dataFields.dateX = "toDate";
		series1.dataFields.categoryY = "name";
		series1.columns.template.propertyFields.fill = "color"; // get color from data
		series1.columns.template.propertyFields.stroke = "color";
		series1.columns.template.strokeOpacity = 1;
		
	// Set fixed cell size for Category Axes
	// Set cell size in pixels
	var cellSize = 20;
		chart.events.on("datavalidated", function(ev) {

			// Get objects of interest
			var chart = ev.target;
			var categoryAxis = chart.yAxes.getIndex(0);

			// Calculate how we need to adjust chart height
			var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

			// get current chart height
			var targetHeight = chart.pixelHeight + adjustHeight;

			// Set it on chart's container
			chart.svgContainer.htmlElement.style.height = targetHeight + "px";
		});
	
	// Set tooltip text font and size
	series1.tooltip.label.fontSize = "8pt";
	series1.tooltip.label.fontFamily="Arial";

	chart.scrollbarX = new am4core.Scrollbar();
	chart.scrollbarX.parent = chart.bottomAxesContainer;
	chart.scrollbarX.minHeight = 7;
	chart.scrollbarX.startGrip.height = 15;
	chart.scrollbarX.endGrip.height = 15;

  }); // end am4core.ready()
