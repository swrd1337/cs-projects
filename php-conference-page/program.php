<?php
session_start();
require_once "./utils/config.php";
include DIR_BASE . "./utils/connect.php";
include DIR_BASE . "./utils/util.php";
include "comps/header.php";
?>
<div class="article">
    <h2 class="title">Conference Program</h2>
    <table>
        <tr>
            <th>Date/Time</th>
            <th>Event</th>
        </tr>
        <tr>
            <td>March 2019</td>
            <td>Center city meeting</td>
        </tr>
        <tr>
            <td>Late April 2019</td>
            <td>Gallery excursion</td>
        </tr>
        <tr>
            <td>13 May 2019</td>
            <td>Amazing Event with boss</td>
        </tr>
        <tr>
            <td>20 May 2019</td>
            <td>Something good for everyone</td>
        </tr>
        <tr>
            <td>1 June 2019</td>
            <td>International working day</td>
        </tr>
    </table>
</div>
<?php
include "comps/footer.php";
?>