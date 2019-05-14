<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
include "comps/header.php";
?>
<div class="article">
    <h2 class="title">Committees are:</h2>
    <ul>
        <li>
            <h3>Investigating Committee.</h3>
            <ol>
                <li>They do something interesting!</li>
                <li>They do something interesting and amazing for this conference!!!</li>
            </ol>
        </li>
        <li>
            <h3>Interim Orders Committee.</h3>
            <ol>
                <li>They do something interesting!</li>
                <li>They do something interesting and amazing for this conference!!!</li>
            </ol>
        </li>
        <li>
            <h3>Professional Conduct Committee.</h3>
            <ol>
                <li>They do something interesting!</li>
                <li>They do something interesting and amazing for this conference!!!</li>
            </ol>
        </li>
        <li>
            <h3>Appointments Committee.</h3>
            <ol>
                <li>They do something interesting!</li>
                <li>They do something interesting and amazing for this conference!!!</li>
            </ol>
        </li>
    </ul>
</div>
<?php
include "comps/footer.php";
?>