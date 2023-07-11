// Function that simulates the tossing of three coins for I Ching divination.
function tossThreeCoins() {
  // Generates a random number from 6 to 9 inclusive. This number represents the sum of three coins.
  return Math.floor(Math.random() * 4) + 6;
}

// Object containing the mapping of I Ching hexagrams.
// Each key in the object represents a hexagram consisting of six "open" or "closed" lines.
// The corresponding value of each key is the hexagram number according to the I Ching.
const hexagrams = {
  "closed,closed,closed,closed,closed,closed": 1,
  "open,open,open,open,open,open": 2,
  "closed,open,open,open,closed,open": 3,
  "open,closed,open,open,open,closed": 4,
  "closed,closed,closed,open,closed,open": 5,
  "open,closed,open,closed,closed,closed": 6,
  "open,closed,open,open,open,open": 7,
  "open,open,open,open,closed,open": 8,
  "closed,closed,closed,open,closed,closed": 9,
  "closed,closed,open,closed,closed,closed": 10,
  "closed,closed,closed,open,open,open": 11,
  "open,open,open,closed,closed,closed": 12,
  "closed,open,closed,closed,closed,closed": 13,
  "closed,closed,closed,closed,open,closed": 14,
  "open,open,closed,open,open,open": 15,
  "open,open,open,closed,open,open": 16,
  "closed,open,open,closed,closed,open": 17,
  "open,closed,closed,open,open,closed": 18,
  "closed,closed,open,open,open,open": 19,
  "open,open,open,open,closed,closed": 20,
  "closed,open,open,closed,open,closed": 21,
  "closed,open,closed,open,open,closed": 22,
  "open,open,open,open,open,closed": 23,
  "closed,open,open,open,open,open": 24,
  "closed,open,open,closed,closed,closed": 25,
  "closed,closed,closed,open,open,closed": 26,
  "closed,open,open,open,open,closed": 27,
  "open,closed,closed,closed,closed,open": 28,
  "open,closed,open,open,closed,open": 29,
  "closed,open,closed,closed,open,closed": 30,
  "open,open,closed,closed,closed,open": 31,
  "open,closed,closed,closed,open,open": 32,
  "open,open,closed,closed,closed,closed": 33,
  "closed,closed,closed,closed,open,open": 34,
  "open,open,open,closed,open,closed": 35,
  "closed,open,closed,open,open,open": 36,
  "closed,open,closed,open,closed,closed": 37,
  "closed,closed,open,closed,open,closed": 38,
  "open,open,closed,open,closed,open": 39,
  "open,closed,open,closed,open,open": 40,
  "closed,closed,open,open,open,closed": 41,
  "closed,open,open,open,closed,closed": 42,
  "closed,closed,closed,closed,closed,open": 43,
  "open,closed,closed,closed,closed,closed": 44,
  "open,open,open,closed,closed,open": 45,
  "open,closed,closed,open,open,open": 46,
  "open,closed,open,closed,closed,open": 47,
  "open,closed,closed,open,closed,open": 48,
  "closed,open,closed,closed,closed,open": 49,
  "open,closed,closed,closed,open,closed": 50,
  "closed,open,open,closed,open,open": 51,
  "open,open,closed,open,open,closed": 52,
  "open,open,closed,open,closed,closed": 53,
  "closed,closed,open,closed,open,open": 54,
  "closed,open,closed,closed,open,open": 55,
  "open,open,closed,closed,open,closed": 56,
  "open,closed,closed,open,closed,closed": 57,
  "closed,closed,open,closed,closed,open": 58,
  "open,closed,open,open,closed,closed": 59,
  "closed,closed,open,open,closed,open": 60,
  "closed,closed,open,open,closed,closed": 61,
  "open,open,closed,closed,open,open": 62,
  "closed,open,closed,open,closed,open": 63,
  "open,closed,open,closed,open,closed": 64,
};

// Initialize the lines and changedLines arrays, and lineCount variable.
let lines = [];
let changedLines = [];
let lineCount = 0;

// Add event listener to the button with the id "tossButton". The button will call this function when clicked.
document.getElementById("tossButton").addEventListener("click", function() {
  let tossButton = document.getElementById("tossButton");
  let linesDiv = document.getElementById("lines");
  let hexagramText = document.getElementById("hexagramText");
  let changedHexagramText = document.getElementById("changedHexagramText");

  // If the button's text is "Start Over", clear all the hexagram lines and text, and reset all variables to start a new reading.
  if (tossButton.textContent === "Start Over") {
      document.getElementById("lines").innerHTML = "";
      document.getElementById("hexagramText").textContent = "";
      document.getElementById("changedHexagramText").textContent = "";
      tossButton.textContent = "Toss Coins";
      lines = [];
      changedLines = [];
      lineCount = 0;
      return;
  }
  
   // If less than 6 lines have been cast, cast a new line.
  if (lineCount < 6) {
    let value = tossThreeCoins();
    let line = value % 2 === 0 ? "open" : "closed";
    let changedLine = line;
    let isChanging = value === 6 || value === 9;
    let lineImage = document.createElement("img");
    
    if (isChanging) {
        changedLine = line === "open" ? "closed" : "open";
        lineImage.src = `/images/${line}-changing.svg`;
    } else {
        lineImage.src = `/images/${line}.svg`;
    }
  
    lineImage.style.marginBottom = "3px";
  
    let div = document.createElement("div");
    div.appendChild(lineImage);
    linesDiv.insertBefore(div, linesDiv.firstChild);  // Insert on top
    
    lines.push(line);  // Push onto the end
    changedLines.push(changedLine);  // Push onto the end
    lineCount++;
  }
  
// If all 6 lines have been cast, determine the hexagram(s) and display their interpretations.
  if (lineCount === 6) {
    let hexagram = hexagrams[lines.join(',')];
    let changedHexagram = hexagrams[changedLines.join(',')];
    let changingLineIndices = lines.map((line, index) => line !== changedLines[index] ? index+1 : '').filter(Boolean);
  
    let hexagramLink = document.createElement("a");
    hexagramLink.href = `https://aiching.app/iching/hexagram-${hexagram}/`;
    hexagramLink.target = '_blank';
    hexagramLink.textContent = hexagram !== undefined ? hexagram : "Not found";
    
    let interpretationLink = document.createElement("a");
    interpretationLink.href = `https://aiching.app/iching/hexagram-${hexagram}/`;
    interpretationLink.target = '_blank';
    interpretationLink.textContent = "Click here to read the interpretation.";
  
    hexagramText.textContent = "Your first Hexagram is ";
    hexagramText.appendChild(hexagramLink);
    hexagramText.appendChild(document.createTextNode(". "));
    hexagramText.appendChild(interpretationLink);
  
    if (changingLineIndices.length > 0) {
      hexagramText.appendChild(document.createTextNode(` Note: read the full text and only the following lines: ${changingLineIndices.join(', ')}`));
  
      let changedHexagramLink = document.createElement("a");
      changedHexagramLink.href = `https://aiching.app/iching/hexagram-${changedHexagram}/`;
      changedHexagramLink.target = '_blank';
      changedHexagramLink.textContent = `read hexagram ${changedHexagram !== undefined ? changedHexagram : "Not found"} for further insights`;
  
      changedHexagramText.textContent = "Once you have read the first hexagram you can then ";
      changedHexagramText.appendChild(changedHexagramLink);
      changedHexagramText.appendChild(document.createTextNode(". When reading the second hexagram ignore any of the changing lines. They only apply to the first hexagram."));
    } else {
      hexagramText.appendChild(document.createTextNode(" Note: read the full text and ignore the lines as your hexagram contains no changing lines."));
      changedHexagramText.textContent = "";
    }
  
    tossButton.textContent = "Start Over";
  }
  
  
});

