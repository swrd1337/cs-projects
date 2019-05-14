<?php
error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED);
ini_set('display_errors', 'on');

define('DIR_BASE', dirname( dirname( __FILE__ ) ) . DIRECTORY_SEPARATOR);

define('DB_HOST', 'localhost');
define('DB_NAME', 'db_gdc');
define('DB_USER', 'root');
define('DB_PASS', '');
?>