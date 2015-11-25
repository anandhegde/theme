<?php
	include_once("dbconnect.php");
	$table_exist = $conn->query("SELECT 1 FROM topVC");
	if( $table_exist == FALSE)
	{
		$create = "CREATE TABLE topVC (
			 	id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                name_of_vc VARCHAR(30) NOT NULL,
                number_of_investment VARCHAR(30) NOT NULL,
                amount_invested VARCHAR(30) NOT NULL
			)";
		$conn->query($create);
	}
	else
	{
		$conn->query("TRUNCATE TABLE topVC");
	}
	include_once("google_spreadsheet_access.php");
    /**
     * Get spreadsheet by title
     */
    $spreadsheetTitle = 'startupinfo';
    $spreadsheetService = new Google\Spreadsheet\SpreadsheetService();
    $spreadsheetFeed = $spreadsheetService->getSpreadsheets();
    $spreadsheet = $spreadsheetFeed->getByTitle($spreadsheetTitle);

    $worksheetTitle = 'TopVc'; // it's generally named 'Sheet1' 
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
    $insert = "INSERT INTO topVC(id,name_of_vc,number_of_investment,amount_invested) VALUES" . $sql ;
    $conn->query($insert);
    $conn->close();
   
	