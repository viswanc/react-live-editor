/*
# FontSizeFinder
  A tool to find the fitting font size for the given box.

## Features
  * Uses the available real-estate is used maximally.
  * Conttains the text within the box.

## Improvements
  * The height sometimes overflow, due to the characters like 'g' and 'y', which flow beyond the base-line.

## Notes
 * The assumed base font is the default font of the monospace family, in Chrome and Safari.
 
 */
 /* Exports */
const FontSizeFinder = function(
  minFontSize = 1,
  maxFontSize = 30,
  precisionFactor = 1.05,
  baseFontSize = 20,
  charWidth = 12, // In pixels, when the font-size is 20px.
  charHeight = 23
) {

  const canTextFitBox = this.canTextFitBox = (text, rows, columns) => {
    let rowsTaken = 0;
    let cursorPos = 0;
    let textLength = text.length;
    let lineBreak;
  
    while(cursorPos < textLength) {
      let line = text.substr(cursorPos, columns + 1);
      lineBreak = line.lastIndexOf(' ');
      
      if(lineBreak > -1) {
        cursorPos += lineBreak + 1;
        rowsTaken += 1;
  
        if(rowsTaken > rows) {
          return false;
        }
      }
      else if(cursorPos + columns >= textLength) {
        return rows > rowsTaken || columns > textLength;
      }
      else {
        return false;
      }
    }
  }

  this.getFontSize = (text, width, height) => {
    text = text.trim().replace(/\s+/g, ' ');

    let possibleRows = 1;
    let possibleCols;
    const getPossibleCols = possibleRows => Math.floor(width / (height / possibleRows / charHeight * charWidth))
    
    do {
      possibleCols = getPossibleCols(possibleRows);
      possibleRows *= precisionFactor; // Try to have a line with full-height and decrease gradually to find the right font-size.
    }
    while(!canTextFitBox(text, Math.floor(possibleRows), possibleCols));
    
    let fs = height / possibleRows / charHeight * baseFontSize;

    return Math.max(Math.min(fs, maxFontSize), minFontSize);
  }
}

module.exports = FontSizeFinder;