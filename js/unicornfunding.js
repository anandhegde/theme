$(document).ready(function(){
	$("#DataTables_Table_0_length").hide();
	$(".datatable-header").hide();
	$(".datatable-footer").hide();
	$("#table_head td").each(function(){
		$(this).removeClass();
	});
	$("#table_body tr:first").remove();
	$.ajax({
		url : "php/topten.php",
		type : "POST",
		success : function(result)
		{
			var result = JSON.parse(result);
			var rows = result.msg;
			var tr = "";
			
			for(i = 0; i < rows.length; i++)
			{
				tr = "<tr>"
				for( k in rows[i])
				{
					if( k == "id")
					{
						tr += "<td style='display:none'>"+k+"</td>";
					}
					else
					{
						tr += "<td>"+ rows[i][k]+"</td>"
					}
				}
				tr += "</tr>";
				console.log(tr)
				$(tr).appendTo("#table_body");
			}
		}
	});
});