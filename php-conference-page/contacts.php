<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
include "comps/header.php";
?>
<div class="article">
    <h2 class="title">You can contact us!</h2>
    <ol>
        <li>With number: <b>+4075747375</b></li>
        <li>With e-mail: <b>some.mail@mail.com</b></li>
        <li>With second e-mail: <b>some.mail2@mail.com</b></li>
        <li>For general questions: <b><a href="#">Some FAQ web-site</a></b></li>
    </ol>
</div>
<?php
include "comps/footer.php";
?>