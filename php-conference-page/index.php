<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
?>

<?php

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : NULL;
if (isset($action)) {
    if ($action == "login") {
        $nume = $_REQUEST["name"];
        $password =  $_REQUEST["password"];
        if (!login($nume, $password)) {
            echo "  <div class=\"dialog-container\">
                            <div class=\"dialog\">
                                <h2>Invalid Credentials</h2>
                                <form action=\"index.php\">
                                    <input class=\"submit-button\" type=\"submit\" value=\"Close\"/>
                                </form>
                            </div>
                        </div>";
        }
    } else if ($action == "logout") {
        logout();
    }
}

if (!isLogged()) {
    include "comps/header.php";
    include "utils/login-form.php";
} else {
    include "comps/header.php";
    include "comps/content.php";
}

include "comps/footer.php";
?>