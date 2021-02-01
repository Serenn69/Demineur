<?php

function afficherMsg(): array
{
    try {
        $bdd = new PDO("mysql:host=localhost:3306;dbname=kzkw2468_dbminesweeper;charset=utf8", "kzkw2468_testmin", "testMS1601");
    } catch (Exception $e) {
        die("Erreur : " . $e->getMessage());
    }

    $result = $bdd->query("SELECT pseudo,score,horaire FROM tminesweeper");

    $tab = array();
    while ($data = $result->fetch(PDO::FETCH_ASSOC)) {
        $i = 0;
        while ($i != 2) {
            if ($i == 0) $tab[$data["pseudo"]][$i] = $data["score"];
            else $tab[$data["pseudo"]][$i] = $data["horaire"];
            $i++;
        }
    }
    $result->closeCursor();
    return $tab;
}

function sortTab($tab)
{
    $tabSorted = array();
    if (count($tab) > 10) $len = 10;
    else $len = count($tab);

    do {
        $tmp = $tab[array_key_first($tab)][0];
        $cle = array_key_first($tab);
        foreach ($tab as $key => $val) {
            if ($tab[$key][0] < $tmp) {
                $tmp = $tab[$key][0];
                $cle = $key;
            }
        }
        array_push($tabSorted, $cle . "/" . $tmp . "/" . $tab[$cle][1]);
        unset($tab[$cle]);
    } while (count($tabSorted) < $len);
    return $tabSorted;
}

?>