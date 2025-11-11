let activeBox = "from";
let fromUnit = "kg";
let toUnit = "lb";

// ✅ Set active box
function setActiveBox(box) {
  activeBox = box;
  document.getElementById("fromValue").classList.remove("active-box");
  document.getElementById("toValue").classList.remove("active-box");
  document.getElementById(box + "Value").classList.add("active-box");
}

// ✅ Keypad input
function pressNum(num) {
  const box = document.getElementById(activeBox + "Value");
  box.value += num;
  autoConvert();
}

// ✅ Delete character
function delChar() {
  const box = document.getElementById(activeBox + "Value");
  box.value = box.value.slice(0, -1);
  autoConvert();
}

// ✅ Clear both boxes
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

// ✅ Switch active input box
function switchBox(direction) {
  if (direction === "up") setActiveBox("from");
  else if (direction === "down") setActiveBox("to");
}

// ✅ Show/hide popup
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


// ✅ Handle unit selection
function selectUnit(type, unit) {
  if (type === "from") fromUnit = unit;
  else toUnit = unit;
  document.getElementById(type + "Btn").innerText = unit + " ▼";
  document.getElementById(type + "Popup").style.display = "none";
  autoConvert();
}

// ✅ Conversion factors (to kilograms)
const toKg = {
  t: 1000,
  uk_ton: 1016.05,
  us_ton: 907.185,
  lb: 0.453592,
  oz: 0.0283495,
  kg: 1,
  g: 0.001
};

// ✅ Convert weight value
function convertWeightValue(value, from, to) {
  let val = parseFloat(value);
  if (isNaN(val)) return "";
  let inKg = val * toKg[from];
  let converted = inKg / toKg[to];
  return converted.toFixed(6).replace(/\.?0+$/, "");
}

// ✅ Auto conversion logic
function autoConvert() {
  let fromVal = document.getElementById("fromValue").value;
  let toVal = document.getElementById("toValue").value;

  if (activeBox === "from") {
    document.getElementById("toValue").value = convertWeightValue(fromVal, fromUnit, toUnit);
  } else {
    document.getElementById("fromValue").value = convertWeightValue(toVal, toUnit, fromUnit);
  }
}

// ✅ Keyboard input
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
