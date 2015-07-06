<?php
	require_once("database_connect.php");
	$movieId = $_GET['id'];
	$movieTitle = $_GET['title'];
	$movieDescription = $_GET['description'];
	$movieImage = $_GET['image'];

	$query = "UPDATE movies SET title=" . $movieTitle . ", description=" . $movieDescription . ", image=" . $movieImage . " WHERE id=" . $movieId;

	if ($db->query($query) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $db->error;
	}

	$db->close();
?>