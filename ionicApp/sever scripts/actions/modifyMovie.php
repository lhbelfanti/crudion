<?php
	require_once("database_connect.php");

	header('Content-Type: application/json');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$movieTitle = $request->title;
	$movieDescription = $request->description;
	$movieImage = $request->image;
	$movieId = $request->id;

	$query = "UPDATE movies SET title='$movieTitle',description='$movieDescription',image='$movieImage' WHERE id='$movieId'";

	if ($db->query($query) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $db->error;
	}

	$db->close();
?>