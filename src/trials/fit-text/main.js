/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

/* Config */
const minFontSize = 1;
const maxFontSize = 30;
const precisionFactor = 1.05;

/* Data */
const baseFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;

/* Dev */
const log = console.log; /* // Dev toggle shortcut.
//*//*
const log = () => {}; //*/

/* Functions */
const canTextFitBox = (text, rows, columns) => {
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

const getFontSize = (text, width, height) => {

  // #Fix:10: The height often overflows, due to the characters like 'g' and 'y', which flow beyond the base-line.
  
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

/* Helpers */
const getBox = (key) => {

  let width = getRandomInt(5, 10) * 20;
  let height = getRandomInt(1, 5) * 20;
  let text = getRandomText(getRandomInt(6, 100));

  return (
    <div key={key} className='box'
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
    >
      <div className="text" style={{ fontSize: getFontSize(text, width, height) + 'px' }}>
      { text }
      </div>
      <div className="dev">{ `${width} x ${height}`}</div>
    </div>
  )
}

/* Tests */
const testOverflow = (acceptedAccuraccy = 1) => {
  
  document.querySelectorAll('.box').forEach(box => {
    let text = box.querySelector('.text');
    var boxRect = box.getBoundingClientRect();
    var textRect = text.getBoundingClientRect();
    
    if(boxRect.width < textRect.width * acceptedAccuraccy
      || boxRect.height < textRect.height * acceptedAccuraccy
    ) {
      log({
        text: text.innerText,
        expectedWidth: boxRect.width,
        expectedHeight: boxRect.height,
        actualWidht: textRect.width,
        actualHeight: textRect.height,
      });
    }
  });
}

/* Main */
export default class FitText extends Component {

  componentDidMount() {

    setTimeout(testOverflow, 500);
  }

  render() {
    
    let start = new Date;
    let Divs = [];
    
    for(let i=0; i < 1000; ++i) {
      Divs.push(getBox(i));
    }

    console.log('Time taken:', new Date - start);
    
    return <div> { Divs }</div>
  }
}
