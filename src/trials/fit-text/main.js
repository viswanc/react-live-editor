/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

/* Data */
const maxFontSize = 30;
const baseFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;

/* Helpers */
const log = console.log;
// const log = () => {};

const longest = words => words.reduce((a, b) => a.length > b.length ? a : b)

const getLongestWordGroupLength = (text, rows) => {
  if(rows === 1) {
    return text.length;
  }

  let minCol = 0;
  let lineStart = 0;
  let lineBreak = 0;
  let maxCols = Math.ceil(text.length / rows);
  let line;

  while(lineBreak > -1) {
    line = text.substr(lineStart, maxCols);
    lineBreak = line.lastIndexOf(' ');
    minCol = Math.max(minCol, lineBreak);
    lineStart = lineStart + lineBreak + 1;
  }

  return Math.max(minCol, longest(text.split(' ')).length);
}

const getBox = (key) => {

  let width = getRandomInt(5, 10) * 20;
  let height = getRandomInt(1, 2) * 20;
  let text = getRandomText(getRandomInt(6, 40));
  // let width = 6 * 20;
  // let height = 3 * 20;
  // let text = '6lht8u 0tju8q pnjt2v';

  return (
    <div key={key} className='box'
      style={{
        width: width + 'px',
        height: height + 'px',
        fontSize: getFontSize(text, width, height) + 'px'
      }}
    >
      { text }
    </div>
  )
}

const getFontSize = (text, width, height) => {
  
  text = text.trim().replace(/\s+/g, ' ');
  let words = text.split(' ');
  let maxRows = words.length;
  
  log(text, maxRows);  
  
  let fs = 0;
  let possibleRows = 1;

  while(possibleRows <= maxRows) {
    
    let minCol = getLongestWordGroupLength(text, possibleRows);
    log(text, possibleRows, minCol);
    let hieghtBasedMaxFS = height / possibleRows / charHeight * baseFontSize;
    if(hieghtBasedMaxFS / baseFontSize * charWidth * minCol < width) {

      log('-- hb --', height, possibleRows, hieghtBasedMaxFS);
      fs = hieghtBasedMaxFS;
      break;
    }

    possibleRows += 1;
  }

  if (! fs) {
    let minCol = longest(words).length;
    let widthBasedMaxFS = width / minCol / charWidth * baseFontSize;
    log('-- wb --', width, minCol, widthBasedMaxFS);
    fs = widthBasedMaxFS;
  }

  return Math.min(fs, maxFontSize);
}

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
  }

  render() {
    
    let Divs = [];
    
    for(let i=0; i < 10; ++i) {
      Divs.push(getBox(i));
    }
    
    return <div> { Divs }</div>
  }
}
