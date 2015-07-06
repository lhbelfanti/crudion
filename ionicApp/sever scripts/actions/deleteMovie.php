<?php
	require_once("database_connect.php");
	$movieId = $_GET['id'];
	$query = "DELETE FROM movies WHERE id=" . $movieId;

	if ($db->query($query) === TRUE) {
	    echo "Record deleted successfully";
	} else {
	    echo "Error deleting record: " . $db->error;
	}

	$db->close();
?>