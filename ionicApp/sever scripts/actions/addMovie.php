<?php
	require_once("database_connect.php");
	$movieTitle = $_GET['title'];
	$movieDescription = $_GET['description'];
	$movieImage = $_GET['image'];

	$query = "INSERT INTO movies(title, description, image) VALUES (". $movieTitle . ", " . $movieDescription . ", " . $movieImage . ")";

	if ($db->query($query) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $db->error;
	}

	$db->close();
?>