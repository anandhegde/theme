<?php
	include_once("dbconnect.php");
	class Result
	{
		public $status = "SUCCESS";
	}
	$sendback = new Result();
	
	$quarter = "SELECT * FROM investment";
	$result = $conn->query($quarter);
	
	/*to store the quarter and the related id of that*/
	$quarter = array();
	$city = array();
	$sector = array();
	$rounds = array();
	
	if($result->num_rows > 0)
	{
		while($row = $result->fetch_assoc())
		{
			if( !in_array($row['quarter'], $quarter))
			{
				$quarter[$row['value']] =  $row['quarter'];
			}
			
			$round_tmp = rtrim(ltrim($row['round'])); 
			if( !in_array($round_tmp,$rounds))
			{
				$rounds[] = $round_tmp;
			}

			$city_tmp = rtrim(ltrim($row['city']));
			if( !in_array($city_tmp,$city))
			{
				$city[] = $city_tmp;
			}

			$sector_tmp = rtrim(ltrim($row['sector']));
			if( !in_array($sector_tmp ,$sector))
			{
				$sector[] = $sector_tmp;
			}
			
		}
	}
	$sendback->quarter = $quarter;
	$sendback->city = $city;
	$sendback->sector = $sector;
	$sendback->round = $rounds;
	$conn->close();
	echo json_encode($sendback);
