<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";

include "comps/header.php";
?>

<div class="article">
    <h2 class="title">Amazing news title for conference</h2>
    <p>
        BlazBlue: Continuum Shift retains the traditional 2D fighter gameplay of two characters participating in
        a duel on a two dimensional plane. A match can consist of one to five rounds known as "rebels". To win a
        round, one player must either deplete the other one's life gauge to 0 by inflicting enough damage
        through various attacks or by having more remaining health after the round's timer depletes.<br><br>

        <img src="images/news.jpg" alt="Some photo."><br><br>

        During each rebel, players fill a Heat Gauge which can be used for advanced techniques such as
        Distortion Drives, Rapid Cancels, Counter Assaults, and certain characters' attacks (Jin/Hakumen). The
        Heat Gauge can be filled via dealing damage, taking damage, and perfectly blocking attacks. However,
        some mechanics from the previous installment have been changed or completely replaced in the transition.
    </p>
</div>
<?php

$action = $_REQUEST["action"];
if (isset($action)) {
    if ($action == "add") {
        $title = htmlspecialchars(mysqli_real_escape_string($conexion_id, $_REQUEST["title"]));
        $content =  htmlspecialchars(mysqli_real_escape_string($conexion_id, $_REQUEST["content"]));

        if (empty($title) || empty($content)) {
            echo "  <div class=\"dialog-container\">
                        <div class=\"dialog\">
                            <h2>Article title or content cannot be empty!</h2>
                            <form action=\"news.php\">
                                <input class=\"submit-button\" type=\"submit\" value=\"Close\"/>
                            </form>
                        </div>
                    </div>";
        } else {
            $sql = "INSERT INTO articles(title, content) VALUES ('$title','$content')";
            if (!mysqli_query($conexion_id, $sql)) {
                die('Error: ' . mysqli_error($conexion_id));
            }
        }

    } else if ($action == "edit") {
        $id = $_REQUEST["id"];
        $sql = "SELECT * FROM articles WHERE id=$id";
        $result = mysqli_query($conexion_id, $sql);
        if ($row = mysqli_fetch_array($result)) {
            $title = $row['title'];
            $content = $row['content'];
            ?>
            <div class="dialog-container">
                <div class="dialog">
                    <h3>Edit dialog</h3>
                    <form action="news.php" method="post">
                        <input name="action" type="hidden" value="update" />
                        <input name="id" type="hidden" value="<?php echo $id; ?>" />
                        Title: <input type="text" name="title" value="<?php echo $title; ?>" />
                        Content: <textarea rows="10" cols="60" name="content"><?php echo $content; ?></textarea>
                        <input class="content-button" type="submit" value="Update" />
                    </form>
                </div>
            </div>
            <?php
        }

    } else if ($action == "update") {
        $id = $_REQUEST["id"];
        $title = htmlspecialchars(mysqli_real_escape_string($conexion_id, $_REQUEST["title"]));
        $content =  htmlspecialchars(mysqli_real_escape_string($conexion_id, $_REQUEST["content"]));

        if (!empty($title) && !empty($content)) {
            $sql = "UPDATE articles SET title='$title', content='$content' WHERE id=$id";
            if (!mysqli_query($conexion_id, $sql)) {
                die('Error: ' . mysqli_error($conexion_id));
            }
        }

    } else if ($action == "delete") {
        $id = $_REQUEST["id"];
        $sql = "DELETE FROM articles WHERE id=$id";
        if (!mysqli_query($conexion_id, $sql)) {
            die('Error: ' . mysqli_error($conexion_id));
        }
    }
}

$query = "SELECT * FROM articles";
$result = mysqli_query($conexion_id, $query);
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_array($result)) {
        $result_dom = "<div class=\"article\"><h2 class=\"title\">" . $row['title'] . "</h2><p>" . $row['content'] . "</p>";
        if (isLogged()) {
            $result_dom .= "<div class=\"controls\"><a href=\"news.php?action=edit&id=" . $row['id'] . "\"\">Edit</a>" .
            "<a href=\"news.php?action=delete&id=" . $row['id'] . "\">Remove</a></div>";
        }
        $result_dom .= "</div>";
        print($result_dom);
    }
}

if (isLogged()) {
?>

<form class="form" action="news.php" method="post">
    <input name="action" type="hidden" value="add" />
    Title: <input type="text" name="title" />
    Content: <textarea rows="10" cols="60" name="content"></textarea>
    <input class="content-button" type="submit" value="Add new post" />
</form>

<?php
}
include "comps/footer.php";
?>
