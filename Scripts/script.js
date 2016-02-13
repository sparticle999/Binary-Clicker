var byte = 0.0;
var displayByte = byte.toFixed(0); //remove decimals (whats half a byte)
var clickValue = 1;
var buyAmt = 1;

var maxAmtChip1Hz = 16;
var amtChip1Hz = 0;
var costChip1Hz = 16;
var amtChip4Hz = 0;
var costChip4Hz = 0; //temp

var maxAmtRam1Kb = 4;
var amtRam1kB = 0;
var costRam1kB = 4;
var amtRam2kB = 0;
var costRam2kB = 128;

function fixDisplay() {
    "use strict";
    document.getElementById("cost_chip").innerHTML = costChip1Hz; //change displayed cost
    document.getElementById("amount_chip").innerHTML = amtChip1Hz;
    document.getElementById("cost_ram").innerHTML = costRam1kB; //change displayed cost
    document.getElementById("amount_ram").innerHTML = amtRam1kB;
    if (amtRam1kB === 4) {
        document.getElementById("type_ram").innerHTML = "2kB";
        document.getElementById("cost_ram").innerHTML = costRam2kB;
    }
    if (clickValue !== 1) {
        document.getElementById("click_value").innerHTML = "Bytes+".concat(clickValue).toString();
    }
}

function save() {
    "use strict";
    var saveData = {
        bytes: byte,
        clickValue: clickValue,
        amtChip1Hz: amtChip1Hz,
        costChip1Hz: costChip1Hz,
        amtRam1kB: amtRam1kB,
        costRam1kB: costRam1kB
    };
    localStorage.setItem("saveData", JSON.stringify(saveData));
}

function delSave() {
    "use strict";
    localStorage.removeItem("saveData");
    window.location.reload();
    load();
}

function exportSave() {
    "use strict";
    save();
    var saveText = window.btoa(JSON.stringify(localStorage.getitem("saveData")));
    // add the innerHTML section here
}

function importSave() {
    "use strict";
    // innerHTML prompt for info
    var loadText = window.atob(JSON.parse(localStorage.getItem("saveData")));
}

function updateByte() {
    "use strict";
    displayByte = byte.toFixed(0); //remove decimals (whats half a byte)
    if (byte >= 0.5 && byte < 1.5) { //due to rounding from .toFixed()
        document.getElementById("bytes").innerHTML = displayByte.toString().concat(" Byte"); //Displays 1 Byte
    } else {
        document.getElementById("bytes").innerHTML = displayByte.toString().concat(" Bytes"); // Displays n Bytes
    }
    if (amtChip1Hz > 0) {
        document.getElementById("bytes_per_second").innerHTML = " +".concat(amtChip1Hz.toString(), "/s");
        document.getElementById("bytes_per_second").style.visibility = "visible";
    }
}

function addByte() {
    "use strict";
    byte += clickValue;
    updateByte();
}

function tick() {
    "use strict";
    byte += amtChip1Hz / 10; //divide 10 due to interval being 10 times faster
    updateByte();
    save();
}

var tickOnce = setInterval(tick, 100); //sets tick() interval

function buyChip1Hz(amt) {
    "use strict";
    if (byte >= (costChip1Hz * (Math.pow(2, amt) - 1)) && amtChip1Hz <= 15) {
        byte -= (costChip1Hz * (Math.pow(2, amt) - 1));
        amtChip1Hz += amt;
        costChip1Hz *= Math.pow(2, amt);
        fixDisplay();
    }
}

function buyRam1kB(amt) {
    "use strict";
    if (byte >= (costRam1kB * (Math.pow(2, amt) - 1)) && amtRam1kB < (maxAmtRam1Kb - 1)) {
        byte -= (costRam1kB * (Math.pow(2, amt) - 1));
        amtRam1kB += amt;
        clickValue += amt;
        costRam1kB *= Math.pow(2, amt);
        fixDisplay();
    }
    if (byte >= costRam1kB && amtRam1kB === 3) {
        byte -= costRam1kB;
        amtRam1kB += 1;
        clickValue += 1;
        fixDisplay();
    }
    if (byte >= (costRam2kB * (Math.pow(2, amt) - 1)) && amtRam1kB >= maxAmtRam1Kb) {
        byte -= (costRam2kB * (Math.pow(2, amt) - 1));
        amtRam2kB += amt;
        clickValue += 2 * amt;
        costRam2kB *= Math.pow(2, amt);
        fixDisplay();
    }
}

function activeMain() {
    "use strict";
    document.getElementById("mainTab").style.backgroundColor = "#222222";
    document.getElementById("statsTab").style.backgroundColor = "transparent";
    document.getElementById("settingsTab").style.backgroundColor = "transparent";
    document.getElementById("mainTab").style.color = "#dddddd";
    document.getElementById("statsTab").style.color = "#222222";
    document.getElementById("settingsTab").style.color = "#222222";
    document.getElementById("main").style.display = "block";
    document.getElementById("stats").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function activeStats() {
    "use strict";
    document.getElementById("mainTab").style.backgroundColor = "transparent";
    document.getElementById("statsTab").style.backgroundColor = "#222222";
    document.getElementById("settingsTab").style.backgroundColor = "transparent";
    document.getElementById("mainTab").style.color = "#222222";
    document.getElementById("statsTab").style.color = "#dddddd";
    document.getElementById("settingsTab").style.color = "#222222";
    document.getElementById("main").style.display = "none";
    document.getElementById("stats").style.display = "block";
    document.getElementById("settings").style.display = "none";
}

function activeSettings() {
    "use strict";
    document.getElementById("mainTab").style.backgroundColor = "transparent";
    document.getElementById("statsTab").style.backgroundColor = "transparent";
    document.getElementById("settingsTab").style.backgroundColor = "#222222";
    document.getElementById("mainTab").style.color = "#222222";
    document.getElementById("statsTab").style.color = "#222222";
    document.getElementById("settingsTab").style.color = "#dddddd";
    document.getElementById("main").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("settings").style.display = "block";
}

function load() {
    "use strict";
    var loadData = JSON.parse(localStorage.getItem("saveData"));
    if (typeof loadData.bytes !== "undefined") {byte = loadData.bytes; }
    if (typeof loadData.clickValue !== "undefined") {clickValue = loadData.clickValue; }
    if (typeof loadData.amtChip1Hz !== "undefined") {amtChip1Hz = loadData.amtChip1Hz; }
    if (typeof loadData.costChip1Hz !== "undefined") {costChip1Hz = loadData.costChip1Hz; }
    if (typeof loadData.amtRam1kB !== "undefined") {amtRam1kB = loadData.amtRam1kB; }
    if (typeof loadData.costRam1kB !== "undefined") {costRam1kB = loadData.costRam1kB; }
    fixDisplay();
    activeMain();
}