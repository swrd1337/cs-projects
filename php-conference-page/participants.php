<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
include "comps/header.php";
?>
<div class="article">
    <h2 class="title">Participants List</h2>
    <table>
        <tr>
            <th>Full Name</th>
            <th>E-Mail</th>
            <th>Number</th>
            <th>Actions</th>
        </tr>
        <tr>
            <td>Jhon Doe</td>
            <td>jhon_doe@gmail.com</td>
            <td>0767676767</td>
            <td></td>
        </tr>
        <?php
        $action = $_REQUEST["action"];
        if (isset($action)) {
            if ($action == "edit") {
                $id = $_REQUEST["id"];
                $sql = "SELECT * FROM participants WHERE id=$id";
                $result = mysqli_query($conexion_id, $sql);
                if ($row = mysqli_fetch_array($result)) {
                    $name = $row['name'];
                    $mail = $row['mail'];
                    $number = $row['number'];
                    ?>
                    <div class="dialog-container">
                    <div class="dialog">
                        <h3>Update participant data</h3>
                        <form class="form" action="participants.php" method="post">
                            <input name="action" type="hidden" value="update" />
                            <input name="id" type="hidden" value="<?php echo $id; ?>" />
                            Full-name: <input type="text" name="name" value="<?php echo $name; ?>" />
                            E-mail: <input type="text" name="mail" value="<?php echo $mail; ?>" />
                            Phone Number: <input type="text" name="number" value="<?php echo $number; ?>" />
                            <input class="content-button" type="submit" value="Update" />
                        </form>
                    </div>
                </div>
            <?php
        }
    } else if ($action == "update") {
        $id = $_REQUEST["id"];
        $name = mysqli_real_escape_string($conexion_id, $_REQUEST["name"]);
        $mail =  mysqli_real_escape_string($conexion_id, $_REQUEST["mail"]);
        $number =  mysqli_real_escape_string($conexion_id, $_REQUEST["number"]);

        if (!empty($name) && !empty($mail) && !empty($number)) {
            $sql = "UPDATE participants SET name='$name', mail='$mail', number='$number' WHERE id=$id";
            if (!mysqli_query($conexion_id, $sql)) {
                die('Error: ' . mysqli_error($conexion_id));
            }
        }
    } else if ($action == "delete") {
        $id = $_REQUEST["id"];
        $sql = "DELETE FROM participants WHERE id=$id";
        if (!mysqli_query($conexion_id, $sql)) {
            die('Error: ' . mysqli_error($conexion_id));
        }
    }
}

$query = "SELECT * FROM participants";
$result = mysqli_query($conexion_id, $query);
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_array($result)) {
        
        $result_dom = "<tr><td>" . $row['name'] . "</td><td>" . $row['mail'] . "</td><td>" . $row['number'] . "</td><td>";
        if ($_SESSION['logged']) {
            $result_dom .= "<a class=\"action\" href=\"participants.php?action=edit&id=" . $row['id'] . "\"\">Edit</a>" .
            "<a class=\"action\" href=\"participants.php?action=delete&id=" . $row['id'] . "\"\">Remove</a>";
        }
        $result_dom .= "</td></tr>";
        print($result_dom);
    }
    print_r($_SESSION['logged']);
}
?>
</table>
</div>
<?php
include "comps/footer.php";
?>