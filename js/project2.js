 am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
	  chart.paddingTop = "0px";
	  chart.paddingBottom = "0px";
	  chart.svgContainer.htmlElement.style.width = am4core.percent(100);
      chart.maskBullets = false; // allow bullets to go out of plot area
		
    let colorSet = new am4core.ColorSet();
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

	//Create beginBullet Series
    var series7 = chart.series.push(new am4charts.LineSeries());
    series7.dataFields.dateX = "fromDate";
    series7.dataFields.categoryY = "name";
    series7.strokeWidth = "0px";

    //Create endBullet Series
    var series8 = chart.series.push(new am4charts.LineSeries());
    series8.dataFields.dateX = "toDate";
    series8.dataFields.categoryY = "name";
    series8.strokeWidth = 0;

    // Set bullet tooltip text font and size
	// series1.columns.template.fillOpacity = .8;
    // columnTemplate.tooltipText = "drag me";
    // columnTemplate.tooltipX = 0; 
    // otherwise tooltip will point to middle of the column
    // series1.tooltip.label.fontSize = "6pt";
	// series1.tooltip.label.fontFamily= "Arial";
    // series1.tooltip.pointerOrientation = "horizontal";
    series7.tooltip.pointerOrientation = "horizontal";
    series8.tooltip.pointerOrientation = "horizontal";

    // label begin bullet
    var labelBulletBegin = new am4charts.LabelBullet();
    series7.bullets.push(labelBulletBegin);
    labelBulletBegin.label.text = "{dateX}";
    labelBulletBegin.label.fontsize = "6pt";
    labelBulletBegin.strokeOpacity = 0;
    labelBulletBegin.stroke = am4core.color("#dadada");
    labelBulletBegin.dy = 0;

    // label end bullet
    var labelBulletEnd = new am4charts.LabelBullet();
    series8.bullets.push(labelBulletEnd);
    labelBulletEnd.label.text = "{dateX}";
    labelBulletEnd.label.fontsize = "6pt";
    labelBulletEnd.stroke = am4core.color("#dadada");
    labelBulletEnd.dy = 0;
        
    // series begin bullet
    var bulletBegin = series7.bullets.push(new am4charts.CircleBullet());
    bulletBegin.stroke = am4core.color("#782f40");
    bulletBegin.strokeWidth = 3;
    // initially invisible
    bulletBegin.opacity = 1;
    bulletBegin.defaultState.properties.opacity = 1;

    // series end bullet
    var bulletEnd = series8.bullets.push(new am4charts.CircleBullet());
    bulletEnd.stroke = am4core.color("#782f40");
    bulletEnd.strokeWidth = 3;
    // initially invisible
	bulletEnd.opacity = 1; 
	bulletEnd.defaultState.properties.opacity = 1;

    // resize bulletBegin cursor when over
    bulletBegin.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
    bulletBegin.draggable = true;

    // create bulletBegin hover state
    var hoverState = bulletBegin.states.create("hover");
    hoverState.properties.scale = 2; // visible when hovered
	 
	// bulletBegin while dragging
    // bulletBegin.events.on("drag", event => {
       // handleDragBegin(event);
    // });

    bulletBegin.events.on("dragstop", event => {
        handleDragBegin(event);
        // var beginDate = event.target.dataItem;
        // beginDate.isHover = false;
        // event.target.isHover = false;
    });
	 
        let beginDate = event.target.dataItem;	 
    let value1 = dateAxis.xToValue(event.target.pixelX);
    
	 function handleDragBegin(event) {
        // beginDate = event.target.dataItem;
		// return beginDate;
		// convert coordinate to value
        // var value1 = dateAxis.xToValue(event.target.pixelX);
		// set new value
        beginDate.dateX = value1;
		// make column hover
        beginDate.isHover = true;
        // make bullet hovered (as it might hide if mouse moves away)
        event.target.isHover = true;
		var value4 = beginDate.dateX;
		console.log(value4);
		// return value4;
      }

	// var value3 = handleDragBegin(event, value4);
    // var value3 = handleDragBegin(event);
	    
	// resize bulletEnd cursor when over
    bulletEnd.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
    bulletEnd.draggable = true;   
	 
	// create bulletEnd hover state
    var hoverState = bulletEnd.states.create("hover");
    hoverState.properties.scale = 2; // visible when hovered
	 
	// bulletEnd while dragging
    bulletEnd.events.on("drag", event => {
        handleDragEnd(event);
    });

    bulletEnd.events.on("dragstop", event => {
        handleDragEnd(event);
        var endDate = event.target.dataItem;
        endDate.isHover = false;
        event.target.isHover = false;
     });
   	 
	 function handleDragEnd(event) {
        var endDate = event.target.dataItem;
        // convert coordinate to value
        var value2 = dateAxis.xToValue(event.target.pixelX);
        // console.log(value2);
        // set new value
        endDate.dateX = value2;
        // make column hover
        endDate.isHover = true;
        // make bullet hovered (as it might hide if mouse moves away)
        event.target.isHover = true;
    }
	
	// Create Series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
	series1.columns.template.height = am4core.percent(60);
	// series1.columns.template.tooltipText = "{name}";
	series1.dataFields.openDateX = "fromDate";
	// series1.dataFields.openDateX = handleDragBegin(); 
	series1.dataFields.dateX = "toDate";
	series1.dataFields.categoryY = "name";
	// series1.draggable = "true;"

	// column template
    var columnTemplate = series1.columns.template;
    columnTemplate.propertyFields.fill = "color"; // get color from data
	columnTemplate.propertyFields.stroke = "color";
	columnTemplate.strokeOpacity = 1;

    // hover state
    // var columnHoverState = columnTemplate.column.states.create("hover");
    // columnHoverState.properties.fillOpacity = 1;
    // you can change any property on hover state and it will be animated
    // columnHoverState.properties.cornerRadiusTopLeft = 35;
    // columnHoverState.properties.cornerRadiusTopRight = 35;
    
    // show bullet when hovered
    series7.events.on("over", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bullet.uid);
        itemBullet.isHover = true;
    });

    // hide bullet when mouse is out
    series7.events.on("out", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bullet.uid);
        itemBullet.isHover = false;
    });

    // start dragging bullet even if we hit on column not just a bullet, this will make it more friendly for touch devices
    series7.events.on("down", event => {
        var dataItem = event.target.dataItem;
        var itemBullet = dataItem.bullets.getKey(bullet.uid);
        itemBullet.dragStart(event.pointer);
    });

    // when columns position changes, adjust minX/maxX of bullets so that we could only drag vertically
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
