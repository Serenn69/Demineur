// Tableau des lettres de l'alphabet
let alpha = ["Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
// Variables globales du nombre de lignes, de colonnes, de mines, le score et timer
let vars = {"maxRows": 0, "maxCols": 0, "maxMines": 0, "score": 0, "secs": -1, "mins": 0, "hours": 0, "chrono": 0};
// Tableau des position des mines
let allPosiMines = new Array();
// Tableau des cases grises à vérifiées
let nearGraySlots = new Array();
// Tableau des cases grises déja vérifiées
let alreadyCheckedSlots = new Array();
// Tableau des infos de chaque case
let slotsInfos = new Array();

// Récupérer l'indice d'une lettre de l'alphabet
function getNumFromAlpha(let) {
    for (let i = 1; i <= alpha.length; i++) {
        if (alpha[i] == let) return i;
    }
}

// Définir un nombre entre minimum et maximum inclus
function hasard(min, max) {
    if (min == 0) {
        let x = Math.floor((Math.random() * parseInt(max + 1)));
        return x;
    } else {
        let x = Math.floor((Math.random() * parseInt(max - min)) + min);
        return x;
    }
}

// Effacer la grille en cours
function removeGrid(id) {
    if (document.getElementById(id)) {
        let grid = document.getElementById(id);
        grid.remove();
    }
}

// Tirer au hasard les cases minées
function defineMinedCases(max, num) {
    for (let i = 0; i < num; i++) {
        let x = hasard(1, max);
        if (allPosiMines.includes(x)) {
            do {
                x = hasard(1, max);
            } while (allPosiMines.includes(x));
        }
        allPosiMines[i] = x;
    }
}

// Timer du temps de partie
function timer() {
    let text = "";
    vars.secs += 1;

    if (vars.secs == 60) {
        vars.secs = 0;
        vars.mins += 1;
    }
    if (vars.mins == 60) {
        vars.mins = 0;
        vars.hours += 1;
    }
    if (vars.hours < 10) text = text + "0";
    text = text + vars.hours + ":";
    if (vars.mins < 10) text = text + "0";
    text = text + vars.mins + ":";
    if (vars.secs < 10) text = text + "0";
    text = text + vars.secs;
    document.getElementById("timer").value = text;
}

// Réinitialiser la partie
function reinitMineSweeper() {

    window.location.reload();
}

// Constructeur de la grille en fonction des paramètres
function buildMineSweeperGrid(rowsGene, colsGene, nbMinesGene) {
    let indexMine = 0;

    if (rowsGene < 10) vars.maxRows = ("0" + rowsGene);
    else vars.maxRows = rowsGene;
    if (colsGene < 10) vars.maxCols = ("0" + colsGene);
    else vars.maxCols = colsGene;
    vars.maxMines = nbMinesGene;

    defineMinedCases((vars.maxRows * vars.maxCols), vars.maxMines);
    removeGrid("mineSweeperGrid");

    let table = document.createElement("TABLE");
    table.setAttribute("id", "mineSweeperGrid");
    document.getElementById("divMineSweeper").appendChild(table);

    let capt = document.createElement("CAPTION");
    let dataCapt = document.createTextNode(rowsGene + " x " + colsGene + " avec " + nbMinesGene + " mines : ");
    capt.appendChild(dataCapt);
    document.getElementById("mineSweeperGrid").appendChild(capt);

    for (let i = 1; i <= vars.maxRows; i++) {
        let tableTr = document.createElement("TR");
        tableTr.setAttribute("id", "trMineSweeper" + i);
        document.getElementById("mineSweeperGrid").appendChild(tableTr);

        for (let y = 1; y <= vars.maxCols; y++) {
            indexMine++;
            let tableTd = document.createElement("TD");
            let btn = document.createElement("BUTTON");
            if (y < 10) btn.setAttribute("name", alpha[i] + "0" + y);
            else btn.setAttribute("name", alpha[i] + y);
            btn.setAttribute("onclick", "clicBtnLeft(this.name);");
            btn.setAttribute("oncontextmenu", "return clicBtnRight(this.name);");
            if (allPosiMines.includes(indexMine)) {
                allPosiMines.splice(allPosiMines.indexOf(indexMine), 1, btn.getAttribute("name"));
            }
            tableTd.appendChild(btn);
            document.getElementById("trMineSweeper" + i).appendChild(tableTd);
        }
    }
    let inputRows = document.getElementById("tabRows");
    inputRows.style.display = "none";
    let inputCols = document.getElementById("tabCols");
    inputCols.style.display = "none";
    let inputMines = document.getElementById("tabMines");
    inputMines.style.display = "none";
    let formButton = document.getElementsByName("btn_gen");
    formButton[0].setAttribute("value", "Reinitialiser");
    formButton[0].setAttribute("onclick", "reinitMineSweeper();")
    let inputTimer = document.getElementsByName("timer");
    inputTimer[0].style.display = "block";

    document.getElementById("divMineSweeper").style.display = "flex";

    setSlotsInfos();
    timer();
    vars.chrono = setInterval("timer()", 1000);
}

// Récupérer toutes les infos de chaque case (nom, tag et cases proches)
function setSlotsInfos() {
    let slotName, nbMines = 0;
    vars.maxCols = parseInt(vars.maxCols);
    vars.maxRows = parseInt(vars.maxRows);

    for (let x = 1; x <= vars.maxRows; x++) {
        for (let y = 1; y <= vars.maxCols; y++) {
            if (y < 10) slotName = alpha[x] + "0" + y;
            else slotName = alpha[x] + y;
            slotsInfos[slotName] = {};
            slotsInfos[slotName][9] = slotName;

            recupNearCasesName(slotName);

            nbMines = 0;
            for (let i = 0; i < 8; i++) {
                if (allPosiMines.includes(slotsInfos[slotName][i])) nbMines++;
            }

            if (!allPosiMines.includes(slotName)) {
                switch (nbMines) {
                    case 1:
                        slotsInfos[slotName][8] = "un";
                        break;
                    case 2:
                        slotsInfos[slotName][8] = "deux";
                        break;
                    case 3:
                        slotsInfos[slotName][8] = "trois";
                        break;
                    case 4:
                        slotsInfos[slotName][8] = "quatre";
                        break;
                    case 5:
                        slotsInfos[slotName][8] = "cinq";
                        break;
                    case 6:
                        slotsInfos[slotName][8] = "six";
                        break;
                    case 7:
                        slotsInfos[slotName][8] = "sept";
                        break;
                    case 8:
                        slotsInfos[slotName][8] = "huit";
                        break;
                    default :
                        slotsInfos[slotName][8] = "gray";
                        break;
                }
            } else slotsInfos[slotName][8] = "mine";
        }
    }
}

// Cliquer sur le bouton gauche de la souris
function clicBtnLeft(name) {

    let slot = document.getElementsByName(name);
    if (slotsInfos[name][8] == "mine") {
        slot[0].style.backgroundImage = "url('assets/mine_red.jpg')";
        slot[0].style.backgroundSize = "cover";
        endGame(name, 0);
    } else discoverCases(name);
    slot[0].removeAttribute("onclick");
    slot[0].setAttribute("oncontextmenu", "return false");
}

// Cliquer sur le bouton droit de la souris
function clicBtnRight(name) {
    let slot = document.getElementsByName(name);

    switch (slotsInfos[name][8]) {
        case "mine":
            slotsInfos[name][10] = slotsInfos[name][8];
            slotsInfos[name][8] = "defused";
            slot[0].style.backgroundImage = "url('assets/flag.jpg')";
            vars.score++;
            slot[0].removeAttribute("onclick");
            break;
        case "flag":
            slotsInfos[name][8] = "doubt";
            slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[name][8]);
            slot[0].removeAttribute("onclick");
            break;
        case "defused":
            vars.score--;
            slotsInfos[name][8] = "doubt";
            slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[name][8]);
            slot[0].removeAttribute("onclick");
            break;
        case "doubt":
            slotsInfos[name][8] = slotsInfos[name][10];
            slot[0].style.backgroundImage = "none";
            slot[0].setAttribute("onclick", "clicBtnLeft(this.name);");
            break;
        default:
            if (slot[0].style.backgroundImage == "none" || slot[0].style.backgroundImage == "") {
                slotsInfos[name][10] = slotsInfos[name][8];
                slotsInfos[name][8] = "flag";
                slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[name][8]);
                slot[0].removeAttribute("onclick");
            }
            break;
    }
    if (vars.score == vars.maxMines) {
        endGame(name, 1);
    }
    slot[0].style.backgroundSize = "cover";
    return false;
}

// Récupérer les noms des cases autour de celle choisie en fonction de son emplacement
function recupNearCasesName(name) {
    let variant = [-1, 0, 1, 0, 1, 0, -1];
    let locaLet = getNumFromAlpha(name.charAt(0));
    let locaNum = parseInt(name.slice(1, 3));

    for (let i = 0; i <= 2; i++) {
        if (alpha[locaLet - 1] === alpha[0]) slotsInfos[name][i] = "none";
        else if ((locaNum + variant[i] < 1 || (locaNum + variant[i]) > vars.maxCols)) slotsInfos[name][i] = "none";
        else slotsInfos[name][i] = alpha[locaLet - 1] + (locaNum + variant[i]);
    }
    if ((locaNum + 1) > vars.maxCols) slotsInfos[name][3] = "none";
    else slotsInfos[name][3] = alpha[locaLet] + (locaNum + 1);

    for (let i = 4; i <= 6; i++) {
        if (alpha[locaLet + 1] === alpha[vars.maxRows + 1]) slotsInfos[name][i] = "none";
        else if ((locaNum + variant[i]) < 1 || (locaNum + variant[i]) > vars.maxCols) slotsInfos[name][i] = "none";
        else slotsInfos[name][i] = alpha[locaLet + 1] + (locaNum + variant[i]);
    }
    if ((locaNum - 1) < 1) slotsInfos[name][7] = "none";
    else slotsInfos[name][7] = alpha[locaLet] + (locaNum - 1);

    for (let i = 0; i < 8; i++) {
        if (slotsInfos[name][i].length < 3) slotsInfos[name][i] = slotsInfos[name][i].substring(0, 1) + "0" + slotsInfos[name][i].substring(1);
    }
}

// Révéler les cases tant qu'elles sont grises jusqu'à une case numérotée
function discoverCases(name) {
    let slot = document.getElementsByName(name);
    if (slotsInfos[name][8] == "gray" && !alreadyCheckedSlots.includes(name)) {
        nearGraySlots.push(name);
        alreadyCheckedSlots.push(name);
    }
    slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[name][8]);
    slot[0].style.backgroundSize = "cover";

    while (nearGraySlots.length > 0) {
        let slotName = nearGraySlots[0];

        for (let i = 0; i < 8; i++) {
            if (slotsInfos[slotName][i].localeCompare("none") != 0) {
                if (slotsInfos[slotsInfos[slotName][i]][8].localeCompare("mine") != 0) {
                    if (slotsInfos[slotsInfos[slotName][i]][8] === "gray" && !alreadyCheckedSlots.includes(slotsInfos[slotName][i])) {
                        nearGraySlots.push(slotsInfos[slotName][i]);
                        alreadyCheckedSlots.push(slotsInfos[slotName][i]);
                    }
                    let slot = document.getElementsByName(slotsInfos[slotName][i]);
                    slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[slotsInfos[slotName][i]][8]);
                    slot[0].style.backgroundSize = "cover";
                }
            }
        }
        nearGraySlots.shift();
    }
}

// Affecter l'url d'une image de fond en fonction de la valeur de la case
function affectSlotUrl(value) {
    return "url('assets/" + value + ".jpg')";
}

// Dévoiler la grille en cas de victoire ou de défaite
function endGame(name, score) {
    for (var key in slotsInfos) {
        let slot = document.getElementsByName(key);
        switch (slotsInfos[key][8]) {
            case "mine":
                slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[key][8] + "_gray");
                break;
            case "defused":
                slot[0].style.backgroundImage = affectSlotUrl("mine_" + slotsInfos[key][8]);
                break;
            default :
                slot[0].style.backgroundImage = affectSlotUrl(slotsInfos[key][8]);
                break;
        }
        slot[0].style.backgroundSize = "cover";
        slot[0].removeAttribute("onclick");
        slot[0].setAttribute("oncontextmenu", "return false");
    }
    if (score == 0) {
        let endSlot = document.getElementsByName(name);
        endSlot[0].style.backgroundImage = "url('assets/mine_red.jpg')";
        endSlot[0].style.backgroundSize = "cover";
        displayScore(0);
    } else displayScore(1);
    clearInterval(vars.chrono);
}

// Afficher score et input pseudo pour le classement
function displayScore(choix) {
    let scoreDiv = document.getElementById("scoreDiv");
    let scoreP = document.getElementById("scoreP");
    let scoreForm = document.getElementById("scoreForm");
    scoreDiv.style.display = "block";
    if (choix == 0) {
        scoreDiv.style.backgroundColor = "black";
        scoreDiv.style.backgroundImage = "url('assets/defaite.png')";
        scoreP.innerHTML = "Perdu..";
        scoreForm.style.display = "none";
        scoreP.style.color = "white";
        setTimeout(clearScoreDiv, 4000);
    } else {
        scoreDiv.style.backgroundImage = "url('assets/victoire.jpg')";
        scoreP.innerHTML = "Gagne !";
        scoreForm.style.display = "block";
        calcScore();
    }
    scoreDiv.style.backgroundSize = "cover";
}

// Effacer la div score lors d'une défaite
function clearScoreDiv() {
    let scoreDiv = document.getElementById("scoreDiv");
    scoreDiv.style.display = "none";
}

// Calculer le score
function calcScore() {
    if (vars.hours < 10) vars.score = "0" + vars.hours + ":";
    else vars.score = vars.hours + ":";
    if (vars.mins < 10) vars.score += "0" + vars.mins + ":";
    else vars.score += vars.mins + ":";
    if (vars.secs < 10) vars.score += "0" + vars.secs;
    else vars.score += vars.secs;
    let scoreCell = document.getElementById("scoreCell");
    scoreCell.value = vars.score;
}