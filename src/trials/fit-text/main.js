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
      <div style={{ fontSize: getFontSize(text, width, height) + 'px' }}>
      { text }
      </div>
      <div className="dev">{ `${width} x ${height}`}</div>
    </div>
  )
}

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
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
