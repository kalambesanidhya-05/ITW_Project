function press(val) {
    if (val === "/") {
        document.getElementById("display").value += "÷";
    }
    else if (val === "-") {
        document.getElementById("display").value += "−";
    }
    else if (val === "*") {
        document.getElementById("display").value += "×";  // SMALL multiply sign
    }
    else {
        document.getElementById("display").value += val;
    }
}

function calculate() {
    let exp = document.getElementById("display").value;

    // Scientific symbol conversions
exp = exp.replace(/π/g, "Math.PI");
exp = exp.replace(/e/g, "Math.E");
exp = exp.replace(/×/g, "*");
exp = exp.replace(/÷/g, "/");
exp = exp.replace(/−/g, "-");

// x^y support
exp = exp.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");


    try {
        let result = eval(exp);
        document.getElementById("display").value = result;

        saveHistory(exp, result);  // ✅ SAVE HISTORY HERE
    } catch {
        document.getElementById("display").value = "Error";
    }
}

function openHistory() {
    loadHistory();
    document.getElementById("historyPopup").style.display = "flex";
}
function closeHistory() {
    document.getElementById("historyPopup").style.display = "none";
}
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function saveHistory(expression, result) {
    history.push({ exp: expression, res: result });
    localStorage.setItem("calcHistory", JSON.stringify(history));
}
function loadHistory() {
    let list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `${item.exp} = <b>${item.res}</b>`;
        div.onclick = () => loadIntoCalculator(item.res);
        list.appendChild(div);
    });
}
function loadIntoCalculator(value) {
    document.getElementById("display").value = value;
    closeHistory();
}
function openUnitPopup() {
    document.getElementById("unitPopup").style.display = "flex";
}

function closeUnitPopup() {
    document.getElementById("unitPopup").style.display = "none";
}
function clr() {
    document.getElementById("display").value = "";
}
document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        press(key);
    }

    // Decimal
    if (key === ".") {
        press(".");
    }

    // Basic operators
    if (key === "+") press("+");
    if (key === "-") press("-");
    if (key === "*") press("*"); // will display ×
    if (key === "/") press("/"); // will display ÷

    // Brackets
    if (key === "(") press("(");
    if (key === ")") press(")");

    // Enter → equals
    if (key === "Enter") {
        calculate();
    }

    // Backspace → delete one char
    if (key === "Backspace") {
        delChar();
    }

    // Escape → clear all
    if (key === "Escape" || key.toLowerCase() === "c") {
        clr();
    }

    // Prevent triggers like page scrolling when pressing spacebar
    event.preventDefault();
});
let openBracket = true;  // track whether next bracket is "(" or ")"

function pressBracket() {
    if (openBracket) {
        document.getElementById("display").value += "(";
    } else {
        document.getElementById("display").value += ")";
    }
    openBracket = !openBracket; // toggle between ( and )
}
function delChar() {
    let display = document.getElementById("display");
    let text = display.value;

    if (text.length === 0) return;

    let last = text[text.length - 1];

    // if last removed was "(" then next should be "("  
    // if last removed was ")" then next should be ")"  
    if (last === "(") openBracket = true;
    if (last === ")") openBracket = false;

    display.value = text.slice(0, -1);
}
function toggleScientific() {
    sciOpen = !sciOpen;

    let panel = document.getElementById("sciPanel");

    if (sciOpen) {
        panel.style.display = "block";
        compressButtons(true);
    } else {
        panel.style.display = "none";
        compressButtons(false);
    }
}

let isDeg = true;

function toggleDegRad() {
    isDeg = !isDeg;
    document.getElementById("degRadBtn").innerText = isDeg ? "DEG" : "RAD";
}
function pressConstant(val) {
    if (val === 'pi') document.getElementById("display").value += "π";
    if (val === 'e') document.getElementById("display").value += "e";
}
function applyFunction(type) {
    let val = document.getElementById("display").value;

    if (val === "") return;

    let num = parseFloat(val.replace(/×/g, "*").replace(/÷/g, "/"));

    switch (type) {
        case "sqrt": document.getElementById("display").value = Math.sqrt(num); break;
        case "abs": document.getElementById("display").value = Math.abs(num); break;
        case "ln": document.getElementById("display").value = Math.log(num); break;
        case "log": document.getElementById("display").value = Math.log10(num); break;
        case "inverse": document.getElementById("display").value = 1 / num; break;
        case "exp": document.getElementById("display").value = Math.exp(num); break;
        case "square": document.getElementById("display").value = num * num; break;
    }
}
function applyTrig(type) {
    let val = document.getElementById("display").value;
    if (val === "") return;

    let num = parseFloat(val);

    if (isDeg) num = num * Math.PI / 180; // convert DEG → RAD

    switch (type) {
        case "sin": document.getElementById("display").value = Math.sin(num); break;
        case "cos": document.getElementById("display").value = Math.cos(num); break;
        case "tan": document.getElementById("display").value = Math.tan(num); break;
    }
}
function applyPower() {
    document.getElementById("display").value += "^";
}
let sciOpen = false;

function toggleScientific() {
    sciOpen = !sciOpen;

    let panel = document.getElementById("sciPanel");

    if (sciOpen) {
        panel.style.display = "block";
        compressButtons(true);
    } else {
        panel.style.display = "none";
        compressButtons(false);
    }
}
function compressButtons(enable) {
    let allButtons = document.querySelectorAll(".row button");

    allButtons.forEach(btn => {
        if (enable) {
            btn.style.height = "40px";
            btn.style.fontSize = "18px";
        } else {
            btn.style.height = "50px";
            btn.style.fontSize = "20px";
        }
    });
}