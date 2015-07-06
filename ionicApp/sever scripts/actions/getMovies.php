<?php
	require_once("database_connect.php");

	header('Content-Type: application/json');

	$query = "SELECT * FROM movies";
	$db->set_charset('utf8');
	$result = $db->query($query) or die($db->error.__LINE__);

	$arr = array();
	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
	 		$arr[] = $row;
	 	}
	}
	# JSON-encode the response
	echo $json_response = json_encode($arr, JSON_UNESCAPED_UNICODE);
	$db->close();
?>