<?php
function logout()
{
	unset($_SESSION['logged']);
	unset($_SESSION['user']);

}

function login($user, $password)
{
	global $conexion_id;
	$logged = FALSE;

	if (isLogged()) {
		logout();
	}

	$sql = sprintf(
		"SELECT * FROM users WHERE NAME='%s' AND password= md5('%s')",
		mysqli_real_escape_string($conexion_id, $user),
		mysqli_real_escape_string($conexion_id, $password)
	);

	if (!($result = mysqli_query($conexion_id, $sql))) {
		echo ('Error: ' . mysqli_error($conexion_id));
	}
	if ($row = mysqli_fetch_array($result)) {
		$logged = TRUE;
		$_SESSION['logged'] = TRUE;
		// $_SESSION['access'] = $row['n'];
	}
	return $logged;
}


function isLogged()
{
	return isset($_SESSION['logged']) and  $_SESSION['logged'] = TRUE;
}
