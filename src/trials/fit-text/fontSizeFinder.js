/*
# FontSizeFinder
  A tool to find the fitting font size for the given box.

## Features
  * Uses the available real-estate is used maximally.
  * Contains the text within the box.

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

  const standardizeText = text => text.replace(/^ +| +$/, '').replace(/  */, ' ');

  const canTextFitBox = this.canTextFitBox = (text, rows, columns) => {
    text = standardizeText(text);
    let rowsTaken = 1;
    let cursorPos = 0;
    let textLength = text.length;
    let parseLength = columns + 1;

    while(cursorPos < textLength) {

      let line = text.substr(cursorPos, parseLength);
      let lineBreak = line.indexOf('\n');

      if(lineBreak === -1) { // There isn't a line-break.
        
        if(columns < line.length) { // There is a need to check for spaces.
          lineBreak = line.lastIndexOf(' ');

          if(lineBreak === -1) { // The columns are lesser than the chars of the longest word.
            return false;
          }
        }
        else { // All the characters are allocated.
          break;
        }
      }

      cursorPos += lineBreak + 1;
      rowsTaken += 1;
    }

    return rowsTaken <= rows;
  };

  this.getFontSize = (text, width, height) => {
    let possibleRows = 1;
    let possibleCols;
    const getPossibleCols = possibleRows => Math.floor(width / (height / possibleRows / charHeight * charWidth));
    
    do {
      possibleCols = getPossibleCols(possibleRows);
      possibleRows *= precisionFactor; // Try to have a line with full-height and decrease gradually to find the right font-size.
    }
    while(!canTextFitBox(text, Math.floor(possibleRows), possibleCols));
    
    let fs = height / possibleRows / charHeight * baseFontSize;

    return Math.max(Math.min(fs, maxFontSize), minFontSize);
  };
};

module.exports = FontSizeFinder;