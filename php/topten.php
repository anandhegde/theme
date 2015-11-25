<?php
	include_once("dbconnect.php");
	class Result
	{
		public $status = "SUCCESS";
	}
	if( $_SERVER["REQUEST_METHOD"] == "POST")
	{
		$sendback = new Result();
		$result = $conn->query("SELECT * FROM unicornfunding");
		$msg = array();
		if($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				$msg[] = $row;
			}
		}
		$sendback->msg = $msg;
		echo json_encode($sendback);
	}
		