<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>GDC Conference</title>
    <link rel="icon" href="./images/icon.png">
    <link rel="stylesheet" href="./css/body.css">
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="./css/content.css">
    <link rel="stylesheet" href="./css/footer.css">
    <link rel="stylesheet" href="./css/buttons.css">
    <link rel="stylesheet" href="./css/apply-form.css">
    <link rel="stylesheet" href="./css/dialog.css">
    <link rel="stylesheet" href="./css/login-form.css">
</head>

<body>
    <div id="header">
        <div class="page-title">
            <a href="index.php">
                <h1>GDC Conference</h1>
            </a>
        </div>
        <div class="navigation-menu">
            <ul>
                <li class="nav-item"><a href="./call-of-papers.php">Call of Papers</a></li>
                <li class="nav-item"><a href="./comittes.php">Committees</a></li>
                <li class="nav-item"><a href="./news.php">News</a></li>
                <li class="nav-item"><a href="./participants.php">Participants</a></li>
                <li class="nav-item"><a href="./program.php">Program</a></li>
                <li class="nav-item"><a href="./contacts.php">Contacts</a></li>
                <?php
                    if (isLogged()) {
                        ?>
                        <li class="nav-item"><a href="./index.php?action=logout">Exit</a></li>
                        <?php
                    } else {
                        ?>
                        <li class="nav-item"><a href="./index.php">Login</a></li>
                        <?php
                    }
                ?>
            </ul>
        </div>
    </div>
    <div id="content">