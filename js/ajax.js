var populate = "";

//to get the values selected from filter and quarter option
var city_selected = [];
var sector_selected = [];
var round_selected = [];
var fromDate = [];
var toDate = [];

//
var fromDateStart = [];
var toDateStart = [];


//to store the filter and quarter got from server
var city_option = [];
var sector_option = [];
var round_option = [];
var fromQuarter_option = [];
var toQuarter_option = [];

$(document).ready(function(){
	$("#flterOptionSelected").hide();
	basicChartCreate();
	getInvestmentInfo();
	$("#clearall").click(function(){
		$("#flterOptionSelected").hide();
		populate = "clear";
		$("#round").html("");
		$("#cities").html("");
		$("#sector").html("");
		/*to add city */
		var city_count = 1;
		var city_chekcbox = "";
		for( i in city_option)
		{

			city_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ city_option[i]+'</label></div>';
			if( city_count == 2)
			{
				city_chekcbox = '<div class="row">' + city_chekcbox + '</div>';
				$(city_chekcbox).appendTo("#cities");
				city_chekcbox = "";
				city_count = 1;
			}
			else
			{
				city_count++;
			}
			
		}
		if(city_count == 2)
		{
			city_chekcbox = '<div class="row">' + city_chekcbox + '</div>';
			$(city_chekcbox).appendTo("#cities");
		}


		/*to add sector*/
		var sector_count = 1;
		var sector_chekcbox = "";
		for( i in sector_option)
		{

			sector_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ sector_option[i]+'</label></div>';
			if( sector_count == 2)
			{
				sector_chekcbox = '<div class="row">' + sector_chekcbox + '</div>';
				$(sector_chekcbox).appendTo("#sector");
				sector_chekcbox = "";
				sector_count = 1;
			}
			else
			{
				sector_count++;
			}
			
		}
		if(sector_count == 2)
		{
			sector_chekcbox = '<div class="row">' + sector_chekcbox + '</div>';
			$(sector_chekcbox).appendTo("#sector");
		}
		/*to add round*/
		var round_count = 1;
		var round_chekcbox = "";
		for( i in round)
		{

			round_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ round[i]+'</label></div>';
			if( round_count == 2)
			{
				round_chekcbox = '<div class="row">' + round_chekcbox + '</div>';
				$(round_chekcbox).appendTo("#round");
				round_chekcbox = "";
				round_count = 1;
			}
			else
			{
				round_count++;
			}
			
		}
		if(round_count == 2)
		{
			round_chekcbox = '<div class="row">' + round_chekcbox + '</div>';
			$(round_chekcbox).appendTo("#round");
		}

		/*to add from and to quarter filter*/
			
		var option_fromDate = "";
		var count = 1;
		for( i in fromQuarter_option)
		{
			if(count == 1)
			{
				$("#form1 div:first a:first span:first").text(fromQuarter_option[i])
				count++;
			}
			option_fromDate += "<option value='"+ i+"'>"+fromQuarter_option[i]+"</option>";	
			
		}
		$(option_fromDate).appendTo("#fromDate");

		var count = 1;
		var option_toDate = "";
		for(i = 0; i < toQuarter_option.length; i++)
		{
			if(count == 1)
			{
				$("#form2 div:first a:first span:first").text(toQuarter_option[i][1])
				count++;
			}
			option_toDate += "<option value='"+ toQuarter_option[i][0]+"'>"+ toQuarter_option[i][1]+"</option>"
		}
		$(option_toDate).appendTo("#toDate");
		basicChartCreate();

	});//clearAll Ends
})//document ready ends 

function getInvestmentInfo()
{
	$.ajax({
		url : "php/investmentinfo.php",
		type : "GET",
		success : function(result)
		{
			result = JSON.parse(result);
			quarter = fromQuarter_option = result.quarter;
			city = city_option =  result.city;
			sector = sector_option =  result.sector;
			round = round_option = result.round;

				/*to add from and to quarter filter*/
			
					var option_fromDate = "";
					var count = 1;
					for( i in quarter)
					{
						if(count == 1)
						{
							$("#form1 div:first a:first span:first").text(quarter[i])
							count++;
						}
						option_fromDate += "<option value='"+ i+"'>"+quarter[i]+"</option>";	
						
					}
					$(option_fromDate).appendTo("#fromDate");

					var option_toDate = "";
					sorted = [];
					for( var i in quarter)
					{
						sorted.push([i,quarter[i]]);
					}
					sorted.sort(function(a,b){ return b[0] - a[0]});
					toQuarter_option =  sorted;
					var count = 1;
					for(i = 0; i < sorted.length; i++)
					{
						if(count == 1)
						{
							$("#form2 div:first a:first span:first").text(sorted[i][1])
							count++;
						}
						option_toDate += "<option value='"+ sorted[i][0]+"'>"+ sorted[i][1]+"</option>"
					}
					$(option_toDate).appendTo("#toDate");
					fromDateStart = $("#fromDateSelect").val();
					toDateStart = $("#toDateSelect").val();	
				
					/*to add city */
					var city_count = 1;
					var city_chekcbox = "";
					for( i in city)
					{

						city_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ city[i]+'</label></div>';
						if( city_count == 2)
						{
							city_chekcbox = '<div class="row">' + city_chekcbox + '</div>';
							$(city_chekcbox).appendTo("#cities");
							city_chekcbox = "";
							city_count = 1;
						}
						else
						{
							city_count++;
						}
						
					}
					if(city_count == 2)
					{
						city_chekcbox = '<div class="row">' + city_chekcbox + '</div>';
						$(city_chekcbox).appendTo("#cities");
					}


					/*to add sector*/
					var sector_count = 1;
					var sector_chekcbox = "";
					for( i in sector)
					{

						sector_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ sector[i]+'</label></div>';
						if( sector_count == 2)
						{
							sector_chekcbox = '<div class="row">' + sector_chekcbox + '</div>';
							$(sector_chekcbox).appendTo("#sector");
							sector_chekcbox = "";
							sector_count = 1;
						}
						else
						{
							sector_count++;
						}
						
					}
					if(sector_count == 2)
					{
						sector_chekcbox = '<div class="row">' + sector_chekcbox + '</div>';
						$(sector_chekcbox).appendTo("#sector");
					}
					/*to add round*/
					var round_count = 1;
					var round_chekcbox = "";
					for( i in round)
					{

						round_chekcbox += '<div class="col-xs-6"><label class="checkbox-inline"> <input type="checkbox">'+ round[i]+'</label></div>';
						if( round_count == 2)
						{
							round_chekcbox = '<div class="row">' + round_chekcbox + '</div>';
							$(round_chekcbox).appendTo("#round");
							round_chekcbox = "";
							round_count = 1;
						}
						else
						{
							round_count++;
						}
						
					}
					if(round_count == 2)
					{
						round_chekcbox = '<div class="row">' + round_chekcbox + '</div>';
						$(round_chekcbox).appendTo("#round");
					}
		}
			
	});

}


/*to make ajax call when checkbox or quarter selection is selected*/
$(document).on('change', '#investmentinfo [type=checkbox]', function (e) {
	getFilterOption();
});

$(document).on('change','select',function(e){
	populate = "";
	getFilterOption();	
});

function getFilterOption()
{
	city_selected = [];
	sector_selected = [];
	round_selected = [];
	$("#cities input:checkbox:checked").each(function(index){
		if( city_selected.indexOf($(this).parent().text()) < 0)
		{
			city_selected.push($(this).parent().text().trim());
		}
	});
	$("#sector input:checkbox:checked").each(function(index){
		if( sector_selected.indexOf($(this).parent().text()) < 0)
		{
			sector_selected.push($(this).parent().text().trim());
		}
	});
	$("#round input:checkbox:checked").each(function(index){
		if( round_selected.indexOf($(this).parent().text()) < 0)
		{
			round_selected.push($(this).parent().text().trim());
		}
	});

	if(populate == "clear")
	{
		fromDate = fromDateStart;
		toDate = toDateStart;
	}
	else
	{
		fromDate = $("#fromDateSelect").val();
		toDate = $("#toDateSelect").val();	
	}
	var city_selected_count = city_selected.length;
	var sector_selected_count = sector_selected.length;
	var round_selected_count = round_selected.length;
	if(  city_selected_count !=0 || sector_selected_count != 0 || round_selected_count != 0)
	{
		$("#flterOptionSelected").show();
		$(".bootstrap-tagsinput").html("");
		for( var k = 0; k < city_selected_count; k++)
		{
			$('<span class="tag label label-info">'+ city_selected[k]+'</span>').appendTo(".bootstrap-tagsinput")	
		}
		for( var k = 0; k < sector_selected_count; k++)
		{
			$('<span class="tag label label-info">'+ sector_selected[k]+'</span>').appendTo(".bootstrap-tagsinput")	
		}
		for( var k = 0; k < round_selected_count; k++)
		{
			$('<span class="tag label label-info">'+ round_selected[k]+'</span>').appendTo(".bootstrap-tagsinput")	
		}
		//alert( city_selected_count + " "+sector_selected_count + " "+ round_selected_count)
	}
	else
	{
		$("#flterOptionSelected").hide();
	}
	createchart();
}

function basicChartCreate()
{
	$.ajax({
		url : "php/ajax.php",
		type : "GET",
		beforeSend: function() {
   	 		$('#daily_stats').html("<img src='ajax-loader.gif' class='centerimg' />");
  		},
		success : function(result)
		{
			$('#daily_stats').html("");
			var result = JSON.parse(result);	
			xaxis = result.xaxis;
			investment = result.investment;
			deals = result.deals;

			 // Charts
			    // ------------------------------

			    // Set paths
			    require.config({
			        paths: {
			            echarts: 'assets/js/plugins/visualization/echarts'
			        }
			    });


			    // Configuration
			    require(
			        [
			            'echarts',
			            'echarts/theme/limitless',
			            'echarts/chart/line',
			            'echarts/chart/bar'
			        ],


			        // Charts setup
			        function (ec, limitless) {

			            // Init
			            //var sales = ec.init(document.getElementById('sales'), limitless);
			            var daily_stats = ec.init(document.getElementById('daily_stats'), limitless);

			            
			            // Daily stats chart options
			            daily_stats_options = {

			                // Setup grid
			                grid: {
			                    x: 84,
			                    x2: 60,
			                    y: 35,
			                    y2: 25
			                },

			                // Add tooltip
			                tooltip: {
			                    trigger: 'axis',
			                    axisPointer: {
			                        type: 'shadow'
			                    },
			                    formatter : function(params)
			                    {
			                    	if( params.length == 1)
			                    	{
			                    		return params[0][1]+"<br>" + params[0][0]+":<br>"+ params[0].value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			                    	}
			                    	else
			                    	{
			                    		return params[0][1]+"<br>" + params[0][0]+":<br>"+ params[0].value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br>"+ params[1][0] +":<br>"+params[1].value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			                    	}
			                    	
			                    }
			                },
			               
			                // Enable drag recalculate
			                //calculable: true,

			                // Add legend
			                legend: {
			                    data: ['Investment','Number Of Deals']
			                },

			                // Horizontal axis
			                xAxis: [{
			                    type: 'category',
			                    data: xaxis
			                }],

			                // Vertical axis
			                yAxis: [
			                    {
			                        type: 'value',
			                        name: 'Investment',
			                        axisLabel: {
			                            formatter: function(value){
			                            	return "$"+(value/1000000)+" Mil";
			                            }
			                        }
			                    },  
			                    {
			                        type: 'value',
			                        name: 'Number Of Deals',
			                        axisLabel: {
			                            formatter: '{value}'
			                        }
			                    }
			                ],
			                
			                // Add series
			                series: [

			                    {
			                        name: 'Investment',
			                        type: 'bar',
			                        data: investment
			                    },
			                    {
			                        name: 'Number Of Deals',
			                        type: 'line',
			                        yAxisIndex: 1,
			                        data: deals
			                    }
			                ]
			            };


			            // Apply options
			           // sales.setOption(sales_options);
			            daily_stats.setOption(daily_stats_options);


			            // Resize charts
			            window.onresize = function() {
			                setTimeout(function() {
			                    //sales.resize();
			                    daily_stats.resize();
			                }, 200)
			            }


			            // Resize in tabs
			            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			                //sales.resize();
			                daily_stats.resize();
			            });
			        }
			    );



		}
	})
}

/*function to make ajax call*/
function createchart()
{
		data = {
		fromDate : fromDate,
		toDate : toDate,
		city_selected : city_selected,
		sector_selected : sector_selected,
		round_selected : round_selected
	}
	$.ajax({
		url : "php/ajax.php",
		type : "POST",
		data : data,
		beforeSend: function() {
   	 		$('#daily_stats').html("<img src='ajax-loader.gif' class='centerimg' />");
  		},
		success : function(result)
		{
			$('#daily_stats').html("");
			var result = JSON.parse(result);	
			xaxis = result.xaxis;
			investment = result.investment;
			deals = result.deals;
			console.log(result)
			 // Charts
			    // ------------------------------

			    // Set paths
			    require.config({
			        paths: {
			            echarts: 'assets/js/plugins/visualization/echarts'
			        }
			    });


			    // Configuration
			    require(
			        [
			            'echarts',
			            'echarts/theme/limitless',
			            'echarts/chart/line',
			            'echarts/chart/bar'
			        ],


			        // Charts setup
			        function (ec, limitless) {

			            // Init
			            //var sales = ec.init(document.getElementById('sales'), limitless);
			            var daily_stats = ec.init(document.getElementById('daily_stats'), limitless);

			            
			            // Daily stats chart options
			            daily_stats_options = {

			                // Setup grid
			                grid: {
			                    x: 84,
			                    x2: 60,
			                    y: 35,
			                    y2: 25
			                },

			                // Add tooltip
			                tooltip: {
			                    trigger: 'axis',
			                    axisPointer: {
			                        type: 'shadow'
			                    },
			                    formatter : function(params)
			                    {
			                    	if( params.length == 1)
			                    	{
			                    		return params[0][1]+"<br>" + params[0][0]+":<br>"+ params[0].value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			                    	}
			                    	else
			                    	{
			                    		return params[0][1]+"<br>" + params[0][0]+":<br>"+ params[0].value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br>"+ params[1][0] +":<br>"+params[1].value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			                    	}
			                    	
			                    }

			                },

			                // Enable drag recalculate
			                //calculable: true,

			                // Add legend
			                legend: {
			                    data: ['Investment','Number Of Deals']
			                },

			                // Horizontal axis
			                xAxis: [{
			                    type: 'category',
			                    data: xaxis
			                }],

			                // Vertical axis
			                yAxis: [
			                    {
			                        type: 'value',
			                        name: 'Investment',
			                        axisLabel: {
			                             formatter: function(value){
			                            	return "$"+(value/1000000)+" Mil";
			                        	}
			                        }
			                    },  
			                    {
			                        type: 'value',
			                        name: 'Number Of Deals',
			                        axisLabel: {
			                            formatter: '{value}'
			                        }
			                    }
			                ],
			                
			                // Add series
			                series: [

			                    {
			                        name: 'Investment',
			                        type: 'bar',
			                        data: investment
			                    },
			                    {
			                        name: 'Number Of Deals',
			                        type: 'line',
			                        yAxisIndex: 1,
			                        data: deals
			                    }
			                ]
			            };


			            // Apply options
			           // sales.setOption(sales_options);
			           if( xaxis.length > 0)
			           	{
			            	daily_stats.setOption(daily_stats_options);
			            }


			            // Resize charts
			            window.onresize = function() {
			                setTimeout(function() {
			                    //sales.resize();
			                    daily_stats.resize();
			                }, 200)
			            }


			            // Resize in tabs
			            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			                //sales.resize();
			                daily_stats.resize();
			            });
			        }
			    );


		}
	})
	
}