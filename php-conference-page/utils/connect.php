<?php
    $conexion_id = mysqli_connect(DB_HOST, DB_USER, DB_PASS);
    
    if (!$conexion_id)  {
        die('Connection DB Error: ' .  mysqli_connect_error());
    }
	     
    mysqli_select_db($conexion_id, DB_NAME) or die("DB Selection error!" . mysqli_error($conexion_id));
?>