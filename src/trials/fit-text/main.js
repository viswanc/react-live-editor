/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

/* Data */
const maxFontSize = 30;
const baseFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;
const whRatio = charHeight / charWidth;

/* Helpers */
// const log = console.log;
const log = () => {};

const getFontSize = (text, width, height) => {
  
  let words = text.trim().split(' ');
  let maxRows = words.length;
  let minCol = words.reduce((a, b) => a.length > b.length ? a : b).length;
  let minRows = 1;

  let hieghtBasedMaxFS = height / maxRows / charHeight * baseFontSize;
  let fs = 0;

  log(text, minCol, maxRows);
  log('hb', height, maxRows, hieghtBasedMaxFS);
  if(hieghtBasedMaxFS / baseFontSize * charWidth * minCol < width) { // Try to fill the height.

    fs = hieghtBasedMaxFS;
  }
  else {

    let widthBasedMaxFS = width / minCol / charWidth * baseFontSize;

    log('wb', width, minCol, widthBasedMaxFS);  
    if(widthBasedMaxFS / baseFontSize  * charHeight * minRows < height) { // Try to fill the width.

      fs = widthBasedMaxFS;
    }
    else { // Use minimum font-size. // ToDo: Find the right minimum font-size.

      fs = charWidth / (width / text.length) * baseFontSize;
      log('min', fs);  
    }
  }

  log(fs , maxFontSize, Math.min(fs , maxFontSize));log(Math.min(fs , maxFontSize));

  return Math.min(fs , maxFontSize);
}

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
  }

  render() {
    
    let Divs = [];
    
    for(let i=0; i < 1000; ++i) {
      let width = getRandomInt(5, 10) * 20;
      let height = getRandomInt(1, 10) * 20;
      let text = getRandomText(getRandomInt(6, 40));

      Divs.push(<div key={i} className='box'
        style={{
          width: width + 'px',
          height: height + 'px',
          fontSize: getFontSize(text, width, height) + 'px'
        }}
      >
        { text }
      </div>
      );
    }
    
    return <div> { Divs }</div>
  }
}
