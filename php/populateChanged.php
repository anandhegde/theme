<?php
    include_once('dbconnect.php');
    $table_exist = $conn->query("SELECT 1 from investment");
    if($table_exist == FALSE)
    {
        $sql = "CREATE TABLE investment (
                id INT(30) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                quarter VARCHAR(30) NOT NULL,
                deals VARCHAR(30) NOT NULL,
                investment VARCHAR(30) NOT NULL,
                value INT(10),
                city VARCHAR(30),
                sector VARCHAR(30),
                round VARCHAR(30)
                )";
        $conn->query($sql);

    }
    else
    {
        $truncate = "truncate table investment";
        $conn->query($truncate);
    } 
    
    include_once("google_spreadsheet_access.php");
     
    /**
     * Get spreadsheet by title
     */
    $spreadsheetTitle = 'startupinfo';
    $spreadsheetService = new Google\Spreadsheet\SpreadsheetService();
    $spreadsheetFeed = $spreadsheetService->getSpreadsheets();
    $spreadsheet = $spreadsheetFeed->getByTitle($spreadsheetTitle);


    $worksheetTitle = 'StartupData-1'; // it's generally named 'Sheet1' 
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
                if( $key != "round")
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
    $insert = "INSERT INTO investment(id,quarter,deals,investment,value,city,sector,round) VALUES" . $sql ;
    $conn->query($insert);
    $conn->close();
   