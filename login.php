<?php 
	if( $_SERVER["REQUEST_METHOD"] == "POST")
	{
		include_once("dbconnect.php");
		$query = "SELECT 1 FROM login_info";
		$table_exist = $conn->query($query);
		if( $table_exist == FALSE)
		{	
			$create = "CREATE TABLE login_info(
				 id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
				 name VARCHAR(50) NOT NULL,
				 email VARCHAR(20) NOT NULL,
				 phone VARCHAR(15) NOT NULL 
				);";
			$conn->query($create);
		}
		else
		{
			$name = $_POST['name'];
			$email = $_POST['email'];
			$phone  = $_POST['phone'];
			$insert = "INSERT INTO login_info (id,name,email,phone) VALUES(NULL,'". $name."','".$email."','".$phone."');";
			$conn->query($insert);
			echo $insert;
		}
	}
	