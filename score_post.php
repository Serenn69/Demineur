<?php
date_default_timezone_set("Europe/Paris");
$horaire = date("d-m-y") . " à " . date("H:i");

try {
    $bdd = new PDO("mysql:host=localhost:3306;dbname=kzkw2468_dbminesweeper;charset=utf8", "kzkw2468_testmin", "testMS1601");
} catch (Exception $e) {
    die("Erreur : " . $e->getMessage());
}

$check = $bdd->prepare("SELECT * FROM tminesweeper WHERE pseudo = ?");
$check->execute(array($_POST["pseudo"]));
$res = ($check->fetch(PDO::FETCH_ASSOC));
if ($res["pseudo"] != $_POST["pseudo"]) {
    $req = $bdd->prepare("INSERT INTO tminesweeper (pseudo, score, horaire) VALUES(?,?,?)");
    $req->execute(array($_POST["pseudo"], $_POST["score"], $horaire));
} else {
    $sql = $bdd->prepare("SELECT score FROM tminesweeper WHERE pseudo = ?");
    $sql->execute(array($_POST["pseudo"]));
    $result = ($sql->fetch(PDO::FETCH_ASSOC));
    if ($_POST["score"] <= $result["score"]) {
        $req = $bdd->prepare("UPDATE tminesweeper SET score = ?, horaire = ? WHERE pseudo = ?");
        $req->execute(array($_POST["score"], $horaire, $_POST["pseudo"]));
    }
}
header("Location:demineur.php");
exit();

?>