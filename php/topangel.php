<?php
	include_once("dbconnect.php");
	$table_exist = $conn->query("SELECT 1 FROM topAngel");
	if( $table_exist == FALSE)
	{
		$create = "CREATE TABLE topAngel (
			 	id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                name_of_angel VARCHAR(30) NOT NULL,
                number_of_investment VARCHAR(30) NOT NULL,
                amount_invested VARCHAR(30) NOT NULL
			)";
		$conn->query($create);
	}
	else
	{
		$conn->query("TRUNCATE TABLE topAngel");
	}
	include_once("google_spreadsheet_access.php");
    /**
     * Get spreadsheet by title
     */
    $spreadsheetTitle = 'startupinfo';
    $spreadsheetService = new Google\Spreadsheet\SpreadsheetService();
    $spreadsheetFeed = $spreadsheetService->getSpreadsheets();
    $spreadsheet = $spreadsheetFeed->getByTitle($spreadsheetTitle);

    $worksheetTitle = 'TopAngel'; // it's generally named 'Sheet1' 
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
                if( $key != "amountinvested")
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
    $insert = "INSERT INTO topAngel(id,name_of_angel,number_of_investment,amount_invested) VALUES" . $sql ;
    $conn->query($insert);
    $conn->close();
   
	