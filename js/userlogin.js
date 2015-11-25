$(document).ready(function(){
	$("#loginerror").hide();

	$("#backtohome").click(function(){
		window.location.href = "timeline.html";
	});

	$("#submitinfo").click(function(){
		var error = "";
		var name = $("#fullname").val();
		var email = $("#emailid").val();
		var phone = $("#phonenum").val();
		if( (name == "" || name == "undefined") ||( email == "" || email == "undefined") ||( phone == "" || phone =="undefined"))
		{
			$("#loginerror").text("Fill Everything");
			$("#loginerror").show();
		}
		else
		{
			$("#loginerror").hide();
			if( !isValidEmailAddress(email))
			{
				error = "email not proper<br>";
			}
			if( error )
			{
				$("#loginerror").html(error);
				$("#loginerror").show();
			}
			else
			{
				data ={
					name : name,
					email : email,
					phone : phone
				}
				$.ajax({
					url : "login.php",
					data : data,
					type : "POST",
					success : function(result){
						//alert(result);
						console.log(result);
					}
				})
			}

		}
	});
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};