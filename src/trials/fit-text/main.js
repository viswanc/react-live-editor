/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

/* Data */
const minFontSize = 1;
const maxFontSize = 30;
const baseFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;

/* Dev */
// const log = console.log;
const log = () => {};

/* Helpers */
const longest = words => words.reduce((a, b) => a.length > b.length ? a : b)

const canTextFitBox = (text, rows, columns) => {
  let rowsTaken = 0;
  let cursorPos = 0;
  let textLength = text.length;
  let lineBreak;

  while(cursorPos < textLength) {
    let line = text.substr(cursorPos, columns + 1);
    lineBreak = line.lastIndexOf(' ');
    log({text, line, lineBreak, cursorPos, columns, rowsTaken, rows, textLength});
    if(lineBreak > -1) {
      cursorPos += lineBreak + 1;
      rowsTaken += 1;

      if(rowsTaken > rows) {
        return false;
      }
    }
    else if(cursorPos + columns >= textLength) {
      return rows > rowsTaken;
    }
    else {
      return false;
    }
  }
}

const getFontSize = (text, width, height) => {
  
  text = text.trim().replace(/\s+/g, ' ');
  let charCount = text.length;
  let words = text.split(' ');
  let minCols = longest(words).length
  let maxRows = words.length;

  let fs = 0;
  let possibleRows = 0;
  let possibleCols;
  const getPossibleCols = possibleRows => Math.floor(width / (height / possibleRows / charHeight * charWidth))
  
  log({possibleRows, maxRows})

  do {
    possibleRows += 1;
    possibleCols = getPossibleCols(possibleRows);
    log({width, charCount, possibleRows, possibleCols, charHeight}, possibleRows * possibleCols);
  }
  while(possibleRows * possibleCols <= charCount);
  log({possibleCols, minCols});
  if(possibleCols < minCols) {
    let widthBasedMaxFS = width / minCols / charWidth * baseFontSize;
    log('-- wb --', {width, minCols, charWidth, widthBasedMaxFS});
    fs = widthBasedMaxFS;
  }
  else {
    
    while(! canTextFitBox(text, possibleRows, possibleCols)) {
      possibleRows += 1;
      possibleCols = getPossibleCols(possibleRows);
    }
    
    let hieghtBasedMaxFS = height / possibleRows / charHeight * baseFontSize;
    log('-- hb --', {height, possibleRows, possibleCols, charHeight, hieghtBasedMaxFS});
    fs = hieghtBasedMaxFS;
  }

  return Math.max(Math.min(fs, maxFontSize), minFontSize);
}

const getBox = (key) => {

  let width = getRandomInt(5, 10) * 20;
  let height = getRandomInt(1, 5) * 20;
  let text = getRandomText(getRandomInt(6, 40));
  // let width = 10 * 20;
  // let height = 1 * 20;
  // let text = 'p49mo 6gr wl5gq 1x5 ef';

  return (
    <div key={key} className='box'
      style={{
        width: width + 'px',
        height: height + 'px',
        fontSize: getFontSize(text, width, height) + 'px'
      }}
    >
      <div style={{
        fontSize: getFontSize(text, width, height) + 'px'
        }}
      >
      { text }
      </div>
      <div className="dev">{ `${width} x ${height}`}</div>
    </div>
  )
}

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
    window.c = canTextFitBox;
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
