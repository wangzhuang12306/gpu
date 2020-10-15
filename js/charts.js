$(window).load(function(){
    
    if($("#chart_activity").length > 0){
        
        var stuff = [], contacts = [];

        for (var i = 0; i < 7; i += 1) {
            stuff.push([i, parseInt(Math.random() * 30)]);
            contacts.push([i, parseInt(Math.random() * 30)]);
        }

        $.plot($("#chart_activity"), [ { data: stuff, label: "stuff"}, { data: contacts, label: "contacts"}], {xaxis: {show: true}, yaxis: { show: true}});
        
    }
    
    if($(".visitsChart-2").length > 0){

        var d1 = [];
        
        for (var i = 1; i <= 30; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

        $.plot($(".visitsChart-2"), [ { data: d1 }], {xaxis: {show: true}, yaxis: { show: true}});
    
    } 

    if($("#chart-2").length > 0){
        

        var d1 = [];
        for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

        var d2 = [];
        for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);

        var d3 = [];
        for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);

        var stack = 0, bars = true, lines = false, steps = false;


        $.plot($("#chart-2"), [ { data: d1, label: "data 1" }, { data: d2, label: "data 2" }, { data: d3, label: "data 3" } ], {
            series: {
                stack: stack,
                lines: { show: lines, fill: true, steps: steps },
                bars: { show: bars, barWidth: 0.6 }
            }
        });
        
        
    }

    if($("#chart-3").length > 0){
        
        var data = [];
        	        
	for( var i = 0; i < 5; i++)	
		data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 };
	

        $.plot($("#chart-3"), data, 
	{
            series: {
                pie: { show: true }
            },
            legend: { show: false }
	});

    }

    if($("#chart-4").length > 0){
        
        var data = [], totalPoints = 300;
        
        var updateInterval = 30;

        

        var plot = $.plot($("#chart-4"), [ getRandomData() ], {
            series: { shadowSize: 0 }, 
            yaxis: { min: 0, max: 100 },
            xaxis: { show: false }
        });

        update();
            
    }

    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();

        setTimeout(update, updateInterval);
    }

    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    function showTooltip(x, y, contents) {
        $('<div class="ct">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y,
            left: x + 10,
            border: '1px solid #000',
            padding: '3px',
            opacity: '0.7',
            'background-color': '#000',            
            color: '#fff'            
        }).appendTo("body").fadeIn(200);
    }    

    var previousPoint = null;
    
    $("#main_chart").bind("plothover", function (event, pos, item) {
        
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $(".ct").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            item.series.label + " of " + Math.round(x) + " = " + Math.round(y));
            }
        }else {
            $(".ct").remove();
            previousPoint = null;            
        }

    });
    
});
