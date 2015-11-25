<?php
	include_once("dbconnect.php");
	$table_exist = $conn->query("SELECT 1 FROM topMnA");
	if( $table_exist == FALSE)
	{
		$create = "CREATE TABLE topMnA (
			 	id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                name_of_acquire VARCHAR(30) NOT NULL,
                acquires_sector VARCHAR(30) NOT NULL,
                name_of_acquiree VARCHAR(30) NOT NULL,
                acquirees_sector VARCHAR(30)
			)";
		$conn->query($create);
	}
	else
	{
		$conn->query("TRUNCATE TABLE topMnA");
	}
	include_once("google_spreadsheet_access.php");
    /**
     * Get spreadsheet by title
     */
    $spreadsheetTitle = 'startupinfo';
    $spreadsheetService = new Google\Spreadsheet\SpreadsheetService();
    $spreadsheetFeed = $spreadsheetService->getSpreadsheets();
    $spreadsheet = $spreadsheetFeed->getByTitle($spreadsheetTitle);

    $worksheetTitle = 'TopMnA'; // it's generally named 'Sheet1' 
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
                if( $key != "acquireessector")
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
    $insert = "INSERT INTO topMnA(id,name_of_acquire,acquires_sector,name_of_acquiree,acquirees_sector) VALUES" . $sql ;
    $conn->query($insert);
    $conn->close();
   
	