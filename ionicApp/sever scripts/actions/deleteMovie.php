<?php
	require_once("database_connect.php");

	header('Content-Type: application/json');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$movieId = $request->id;

	$query = "DELETE FROM movies WHERE id='$movieId'";

	if ($db->query($query) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $db->error;
	}

	$db->close();
?>