<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Démineur</title>
    <script type="text/javascript" src="demineur.js"></script>
    <link rel="stylesheet" href="demineur.css">
</head>
<body class="bMineSweeper">
<a href="../../index.html">Accueil</a>
<div id="titre">
    <h1>
        <img src="assets/titre.png" alt="Titre démineur" width="700" height="100">
        <div class="version">v2.4</div>
    </h1>
</div>
<hr>
<div id="game">
    <article class="news">
        <h2>News<a id="help" href="assets/regles.JPG" target="_blank"><img src="assets/help.png" title="Règles du jeu"
                                                                           alt="bouton d'aide" width="20" height="20"/></a>
            <hr>
        </h2>
        <table>
            <tr>
                <td class="left">06/01 :</td>
                <td></td>
                <td class="right"> Début du projet</td>
            </tr>
            <tr>
                <td class="left">11/01 :</td>
                <td>[1.0]</td>
                <td class="right"> Release du D3min3ur</td>
            </tr>
            <tr>
                <td class="left">12/01 :</td>
                <td>[1.1]</td>
                <td class="right"> Ajout de la section "News"</td>
            </tr>
            <tr>
                <td class="left">13/01 :</td>
                <td>[2.0]</td>
                <td class="right"> Refonte du code</td>
            </tr>
            <tr>
                <td class="left">14/01 :</td>
                <td>[2.1]</td>
                <td class="right"> Ajout, après clic droit, du "?" puis retour à la case normale</td>
            </tr>
            <tr>
                <td class="left">15/01 :</td>
                <td>[2.2]</td>
                <td class="right"> Ajout d'un timer</td>
            </tr>
            <tr>
                <td class="left">16/01 :</td>
                <td>[2.3]</td>
                <td class="right"> Changement de l'affichage de vitoire ou défaite et du score</td>
            </tr>
            <tr>
                <td class="left">17/01 :</td>
                <td>[2.4]</td>
                <td class="right"> Ajout de l'enregistrement du pseudo et d'un Highscore avec base de données</td>
            </tr>
        </table>
    </article>
    <div id="grid">
        <form class="formMineSweeper">
            <fieldset>
                <legend>Parametres de jeu :</legend>
                <table>
                    <tr id="tabRows">
                        <td><label>Lignes : </label></td>
                        <td><input type="number" name="lignes" size="5" value="5" min="5" max="20"/></td>
                    </tr>
                    <tr id="tabCols">
                        <td><label>Colonnes : </label></td>
                        <td><input type="number" name="colonnes" size="5" value="5" min="5" max="20"/></td>
                    </tr>
                    <tr id="tabMines">
                        <td><label>Mines : </label></td>
                        <td><input type="number" name="mines" size="5" value="2" min="2" max="50"/></td>
                    </tr>
                </table>
                <input type="button" name="btn_gen" value="Generer"
                       onclick="buildMineSweeperGrid(lignes.value, colonnes.value, mines.value);">
                <input id="timer" type="text" name="timer" size="5" hidden />
            </fieldset>
        </form>
        <div id="divMineSweeper"></div>
        <div id="scoreDiv">
            <p id="scoreP"></p>
            <form action="score_post.php" method="post" id="scoreForm">
                <table>
                    <tr>
                        <td><label>Votre score : </label></td>
                        <td><input id="scoreCell" type="text" name="score" size="5" readonly/></td>
                    </tr>
                    <tr>
                        <td><label>Votre pseudo : </label></td>
                        <td><input type="text" name="pseudo" size="10" maxlength="30"/></td>
                    </tr>
                </table>
                <input type="submit" name="btn_score" value="Enregistrer"/>
            </form>
        </div>
    </div>
    <article class="score">
        <h2>Highscores
            <hr>
        </h2>
        <table id="tabScore">
            <?php
            include("functions.php");
            $tab = afficherMsg();
            if (!empty($tab)) $tab = sortTab($tab);
            for ($i = 1; $i <= (count($tab)); $i++) {
                $tabI = explode("/", $tab[$i - 1]);
                echo "<tr><td><strong>" . $i . ".</strong></td><td><strong> " . $tabI[0] . "</strong></td><td>[</td><td> " . $tabI[1] . "</td><td>]</td><td> " . $tabI[2] . "</td>";
            }
            ?>
        </table>
    </article>
</div>
</body>
</html>