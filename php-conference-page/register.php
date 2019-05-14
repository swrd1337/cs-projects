<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
?>

<?php
$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : NULL;
if (isset($action)) {
    if ($action == "register") {
        $name = trim(htmlspecialchars($_REQUEST["name"]));
        $password =  md5($_REQUEST["password"]);
        $mail =   trim(htmlspecialchars($_REQUEST["mail"]));
        $mail = filter_var($mail, FILTER_VALIDATE_EMAIL);

        if (empty($name) || empty($password) || empty($password)) {
            echo "  <div class=\"dialog-container\">
                        <div class=\"dialog\">
                            <h2>Credentials are empty!</h2>
                            <form action=\"register.php\">
                                <input class=\"submit-button\" type=\"submit\" value=\"Close\"/>
                            </form>
                        </div>
                    </div>";
        } else {
            $sql = "INSERT INTO users(name, password, mail) VALUES ('$name','$password', '$mail')";
            if (!mysqli_query($conexion_id, $sql)) {
                die('Error: ' . mysqli_error($conexion_id));
            } else {
                header("Location: index.php");
            }
        }
    }
}

include "comps/min-header.php";
include "utils/register-form.php";
include "comps/footer.php";
?>