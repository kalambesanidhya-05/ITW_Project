let activeBox = "from";
let fromUnit = "m";
let toUnit = "km";

// ✅ Focus and highlight active box
function setActiveBox(box) {
  activeBox = box;
  document.getElementById("fromValue").classList.remove("active-box");
  document.getElementById("toValue").classList.remove("active-box");
  document.getElementById(box + "Value").classList.add("active-box");
}

// ✅ Press number
function pressNum(num) {
  const box = document.getElementById(activeBox + "Value");
  box.value += num;
  autoConvert();
}

// ✅ Delete last character
function delChar() {
  const box = document.getElementById(activeBox + "Value");
  box.value = box.value.slice(0, -1);
  autoConvert();
}

// ✅ Clear all
function clr() {
  document.getElementById("fromValue").value = "";
  document.getElementById("toValue").value = "";
}

// ✅ Toggle sign
function toggleSign() {
  const box = document.getElementById(activeBox + "Value");
  if (box.value.startsWith("-")) {
    box.value = box.value.substring(1);
  } else {
    box.value = "-" + box.value;
  }
  autoConvert();
}

// ✅ Switch between boxes
function switchBox(direction) {
  if (direction === "up") setActiveBox("from");
  else if (direction === "down") setActiveBox("to");
}

// ✅ Popup toggles
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


// ✅ Select unit and close popup
function selectUnit(type, unit) {
  if (type === "from") fromUnit = unit;
  else toUnit = unit;
  document.getElementById(type + "Btn").innerText = unit + " ▼";
  document.getElementById(type + "Popup").style.display = "none";
  autoConvert();
}

// ✅ Conversion factors (to meters)
const toMeters = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
  NM: 1852,
  mil: 0.0000254
};

// ✅ Conversion function
function convertLengthValue(value, from, to) {
  let val = parseFloat(value);
  if (isNaN(val)) return "";
  let inMeters = val * toMeters[from];
  let converted = inMeters / toMeters[to];
  return converted.toFixed(6).replace(/\.?0+$/, ""); // trim trailing zeros
}

// ✅ Auto conversion depending on active box
function autoConvert() {
  let fromVal = document.getElementById("fromValue").value;
  let toVal = document.getElementById("toValue").value;

  if (activeBox === "from") {
    document.getElementById("toValue").value = convertLengthValue(fromVal, fromUnit, toUnit);
  } else {
    document.getElementById("fromValue").value = convertLengthValue(toVal, toUnit, fromUnit);
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
