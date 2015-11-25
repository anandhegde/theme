<?php
	include_once("dbconnect.php");
	$table_exist = $conn->query("SELECT 1 FROM toptenfinance");
	if( $table_exist == FALSE)
	{
		$create = "CREATE TABLE toptenfinance (
			 	id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                companyname VARCHAR(30) NOT NULL,
                investors VARCHAR(30) NOT NULL,
                sector VARCHAR(30) NOT NULL,
                amount VARCHAR(30),
                city VARCHAR(30)
			)";
		$conn->query($create);
	}
	else
	{
		$conn->query("TRUNCATE TABLE toptenfinance");
	}
	include_once("google_spreadsheet_access.php");
    /**
     * Get spreadsheet by title
     */
    $spreadsheetTitle = 'startupinfo';
    $spreadsheetService = new Google\Spreadsheet\SpreadsheetService();
    $spreadsheetFeed = $spreadsheetService->getSpreadsheets();
    $spreadsheet = $spreadsheetFeed->getByTitle($spreadsheetTitle);

    $worksheetTitle = 'Top10Finance'; // it's generally named 'Sheet1' 
    $worksheetFeed = $spreadsheet->getWorksheets();
    $worksheet = $worksheetFeed->getByTitle($worksheetTitle);

    /**
     * Get row lists of worksheet
     */
    $listFeed = $worksheet->getListFeed();
    $sql = "";
    foreach ($listFeed->getEntries() as $entries) {
            $values = "( NULL, ";
            foreach ($entries->getValues() as $key => $value) {
                if( $key != "city")
                {
                 $values .= "'".$value."',";
                }
                else
                {
                    $values .= "'".$value."'";
                }
            }
            $values .= "),";
            $sql .= $values;
    }
    $sql = rtrim($sql,",");
    $insert = "INSERT INTO toptenfinance(id,companyname,investors,sector,amount,city) VALUES" . $sql ;
    $conn->query($insert);
    $conn->close();
   
	