<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbName = "movies_db";

	// Create connection
	$db = new mysqli($servername, $username, $password, $dbName);

	// Check connection
	if ($db->connect_error) {
    	die("Connection failed: " . $db->connect_error);
	}

	mysql_query("SET NAMES 'utf8'");
?>
