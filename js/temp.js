let activeBox = "from";
let fromUnit = "C";
let toUnit = "F";

function setActiveBox(box) {
  activeBox = box;
  document.getElementById("fromValue").classList.remove("active-box");
  document.getElementById("toValue").classList.remove("active-box");
  document.getElementById(box + "Value").classList.add("active-box");
}

function pressNum(num) {
  const box = document.getElementById(activeBox + "Value");
  box.value += num;
  autoConvert(); // ✅ update result live
}

function delChar() {
  const box = document.getElementById(activeBox + "Value");
  box.value = box.value.slice(0, -1);
  autoConvert();
}

function clr() {
  document.getElementById("fromValue").value = "";
  document.getElementById("toValue").value = "";
}

function toggleSign() {
  const box = document.getElementById(activeBox + "Value");
  if (box.value.startsWith("-")) {
    box.value = box.value.substring(1);
  } else {
    box.value = "-" + box.value;
  }
  autoConvert();
}

function switchBox(direction) {
  if (direction === "up") setActiveBox("from");
  else if (direction === "down") setActiveBox("to");
}

// ✅ Dropdown Popup Handling
function togglePopup(type) {
  const fromPopup = document.getElementById("fromPopup");
  const toPopup = document.getElementById("toPopup");

  // Close both first
  fromPopup.style.display = "none";
  toPopup.style.display = "none";

  // Then toggle the one that was clicked
  const popup = document.getElementById(type + "Popup");
  popup.style.display = "block";
}


function selectUnit(type, unit) {
  if (type === "from") fromUnit = unit;
  else toUnit = unit;
  document.getElementById(type + "Btn").innerText = unit + " ▼";
  document.getElementById(type + "Popup").style.display = "none";
  autoConvert(); // ✅ auto convert when units change
}

// ✅ Conversion Logic (bidirectional)
function convertTemp(value, from, to) {
  let val = parseFloat(value);
  if (isNaN(val)) return "";

  let result = val;

  // Convert input to Celsius first
  if (from === "F") result = (val - 32) * 5 / 9;
  else if (from === "K") result = val - 273.15;

  // Convert from Celsius to target unit
  if (to === "F") result = (result * 9 / 5) + 32;
  else if (to === "K") result = result + 273.15;

  return result.toFixed(2);
}

// ✅ Auto convert depending on active box
function autoConvert() {
  let fromVal = document.getElementById("fromValue").value;
  let toVal = document.getElementById("toValue").value;

  if (activeBox === "from") {
    document.getElementById("toValue").value = convertTemp(fromVal, fromUnit, toUnit);
  } else {
    document.getElementById("fromValue").value = convertTemp(toVal, toUnit, fromUnit);
  }
}

// ✅ Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key)) pressNum(key);
  if (key === ".") pressNum(".");
  if (key === "Backspace") delChar();
  if (key === "Enter") autoConvert();
  if (key === "-" && !event.shiftKey) toggleSign();
  if (key === "Escape") clr();
  if (key === "ArrowUp") switchBox("up");
  if (key === "ArrowDown") switchBox("down");

  event.preventDefault();
});
// ✅ Close unit popups when clicking anywhere outside
document.addEventListener("click", function (event) {
  const fromPopup = document.getElementById("fromPopup");
  const toPopup = document.getElementById("toPopup");

  // if click is outside both popups and their buttons
  if (
    !fromPopup.contains(event.target) &&
    !toPopup.contains(event.target) &&
    !document.getElementById("fromBtn").contains(event.target) &&
    !document.getElementById("toBtn").contains(event.target)
  ) {
    fromPopup.style.display = "none";
    toPopup.style.display = "none";
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("fromPopup").style.display = "none";
    document.getElementById("toPopup").style.display = "none";
  }
});
