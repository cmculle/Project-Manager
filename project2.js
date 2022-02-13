 am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
	  chart.paddingTop = "0px";
	  chart.paddingBottom = "0px";
	  chart.svgContainer.htmlElement.style.width = am4core.percent(100);
      chart.maskBullets = false; // allow bullets to go out of plot area
		
    var colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [{
        name: "Survey",
        fromDate: "2018-01-01",
        toDate: "2019-01-01",
        color: am4core.color("#782f40")
      },
      {
        name: "Survey",
        fromDate: "2019-02-01",
        toDate: "2019-06-01",
        color: am4core.color("#782f40")
      },
      {
        name: "Environmental",
        fromDate: "2018-03-01 15:30",
        toDate: "2019-01-01 21:30",
        color: am4core.color("#782f40")
      },

      {
        name: "Environmental",
        fromDate: "2019-02-15 09:00",
        toDate: "2019-02-28",
        color: am4core.color("#782f40")
      },
      {
        name: "Preliminary Design",
        fromDate: "2018-04-01 13:00",
        toDate: "2018-09-01 17:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Final Design",
        fromDate: "2018-06-01 11:00",
        toDate: "2018-08-01 16:00",
        color: am4core.color("#782f40")
      },
      {
        name: "Final Design",
        fromDate: "2018-01-01 16:00",
        toDate: "2018-05-01 19:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Bidding",
        fromDate: "2018-01-01 16:00",
        toDate: "2018-01-01 20:00",
        color: am4core.color("#782f40")
      },
      {
        name: "Bidding",
        fromDate: "2019-01-01 20:30",
        toDate: "2019-02-01 24:00",
        color: am4core.color("#782f40")
      },

      {
        name: "Construction",
        fromDate: "2018-01-01 13:00",
        toDate: "2018-01-01 24:00",
        color: am4core.color("#782f40")
      },
	  
	  {
        name: "Closeout",
        fromDate: "2019-01-01",
        toDate: "2019-05-01",
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
		dateAxis.max = new Date(2020, 2, 15, 0, 0, 0).getTime();
		dateAxis.strictMinMax = true;
		dateAxis.renderer.tooltipLocation = 0;
	
    // Create Series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
	series1.columns.template.height = am4core.percent(60);
	// series1.columns.template.tooltipText = "{name}";
    series1.dataFields.openDateX = "fromDate";
	series1.dataFields.dateX = "toDate";
	series1.dataFields.categoryY = "name";

    //Create startBullet Series
    var series7 = chart.series.push(new am4charts.LineSeries());
    series7.dataFields.dateX = "fromDate";
    series7.dataFields.categoryY = "name";
    series7.strokeWidth = "0px";

    //Create stopBullet Series
    var series8 = chart.series.push(new am4charts.LineSeries());
    series8.dataFields.dateX = "toDate";
    series8.dataFields.categoryY = "name";
    series8.strokeWidth = 0;
	
    // column template
    var columnTemplate = series1.columns.template;
    columnTemplate.propertyFields.fill = "color"; // get color from data
	columnTemplate.propertyFields.stroke = "color";
	columnTemplate.strokeOpacity = 1;

    // Set bullet tooltip text font and size
	// series1.columns.template.fillOpacity = .8;
    series7.tooltipText = "drag me";
    series7.tooltipY = 0; // otherwise tooltip will point to middle of the column
    // series1.tooltip.label.fontSize = "6pt";
	// series1.tooltip.label.fontFamily= "Arial";
    // series1.tooltip.pointerOrientation = "horizontal";
    series7.tooltip.pointerOrientation = "horizontal";
    series8.tooltip.pointerOrientation = "horizontal";

    // label start bullet
    var labelBullet1 = new am4charts.LabelBullet();
    series7.bullets.push(labelBullet1);
    labelBullet1.label.text = "{fromDate}";
    labelBullet1.label.fontsize = "6pt";
    labelBullet1.strokeOpacity = 0;
    labelBullet1.stroke = am4core.color("#dadada");
    labelBullet1.dy = 0;

    // label stop bullet
    var labelBulletStop = new am4charts.LabelBullet();
    series8.bullets.push(labelBulletStop);
    labelBulletStop.label.text = "{toDate}";
    labelBulletStop.label.fontsize = "6pt";
    labelBulletStop.strokeOpacity = 0;
    labelBulletStop.stroke = am4core.color("#dadada");
    labelBulletStop.dy = 0;
        
    // series start bullet
    var bulletStart = series7.bullets.push(new am4charts.CircleBullet());
    bulletStart.stroke = am4core.color("#782f40");
    bulletStart.strokeWidth = 3;
    bulletStart.opacity = 1; // initially invisible
    bulletStart.defaultState.properties.opacity = 1;

    // series stop bullet
    var bulletStop = series8.bullets.push(new am4charts.CircleBullet());
    bulletStop.stroke = am4core.color("#782f40");
    bulletStop.strokeWidth = 3;
    bulletStop.opacity = 1; // initially invisible
    bulletStop.defaultState.properties.opacity = 1;

    // resize bulletStart cursor when over
    bulletStart.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
    bulletStart.draggable = true;

    // resize bulletStop cursor when over
    bulletStop.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
    bulletStop.draggable = true;

    // create bulletStart hover state
    var hoverState = bulletStart.states.create("hover");
    hoverState.properties.scale = 2; // visible when hovered

    // create bulletStop hover state
    var hoverState = bulletStop.states.create("hover");
    hoverState.properties.scale = 2; // visible when hovered

    // bulletStart while dragging
    bulletStart.events.on("drag", event => {
        handleDrag(event);
    });

    bulletStart.events.on("dragstop", event => {
        handleDrag(event);
        var dataItem = event.target.dataItem;
        dataItem.isHover = false;
        event.target.isHover = false;
    });

    // bulletStop while dragging
    bulletStop.events.on("drag", event => {
        handleDrag(event);
    });

    bulletStop.events.on("dragstop", event => {
        handleDrag(event);
        var dataItem = event.target.dataItem;
        dataItem.isHover = false;
        event.target.isHover = false;
    });

    function handleDrag(event) {
        var dataItem = event.target.dataItem;
        // convert coordinate to value
        var value = dateAxis.xToValue(event.target.pixelX);
        console.log(value);
        // set new value
        dataItem.dateX = value;
        // make column hover
        dataItem.isHover = true;
        // hide tooltip not to interrupt
        // dataItem.hideTooltip(0);
        // make bullet hovered (as it might hide if mouse moves away)
        event.target.isHover = true;
    }



    // hover state
    // var columnHoverState = columnTemplate.column.states.create("hover");
    // columnHoverState.properties.fillOpacity = 1;
    // you can change any property on hover state and it will be animated
    // columnHoverState.properties.cornerRadiusTopLeft = 35;
    // columnHoverState.properties.cornerRadiusTopRight = 35;
    
    // show bullet when hovered
    series7.events.on("over", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bulletStart.uid);
        itemBullet.isHover = true;
    });

    // hide bullet when mouse is out
    series7.events.on("out", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bulletStart.uid);
        itemBullet.isHover = false;
    });

    // start dragging bullet even if we hit on column not just a bullet, this will make it more friendly for touch devices
    series7.events.on("down", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bullet.uid);
        itemBullet.dragStart(event.pointer);
    });

    // when columns position changes, adjust minX/maxX of bullets so that we could only dragg vertically
    series7.events.on("positionchanged", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bullet.uid);
        // var column = dataItem.column;
        itemBullet.minY = pixelY;
        itemBullet.maxY = itemBullet.minY;
        itemBullet.minX = 0;
        itemBullet.maxX = chart.seriesContainer.pixelWidth;
     });

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

    // for scroll bar-> chart.scrollbarX = new am4core.Scrollbar();
	// for scroll bar-> chart.scrollbarX.parent = chart.bottomAxesContainer;

  }); // end am4core.ready()
