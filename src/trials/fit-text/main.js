/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import { PerfMetrics } from '../../libs/dev';

import './main.css';
import FontSizeFinder from './fontSizeFinder';

/* Config */
const minFontSize = 1;
const maxFontSize = 30;
const precisionFactor = 1.05;
const baseFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;

/* Dev */
const log = console.log; /* // Dev toggle shortcut.
//*//*
const log = () => {}; //*/

/* Delegates */
const getFontSize = new FontSizeFinder(
  minFontSize, maxFontSize, precisionFactor,
  baseFontSize, charWidth, charHeight
).getFontSize;

/* Helpers */
const getBox = (key) => {

  let width = getRandomInt(5, 10) * baseFontSize;
  let height = getRandomInt(1, 5) * baseFontSize;
  let text = getRandomText(getRandomInt(6, 100), 'abcdefghijklmnopqrstuvwxyz0123456789    \n\n');

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
const analyzeOverFlow = (acceptedAccuraccy = 1) => {
  
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

    setTimeout(analyzeOverFlow, 500);
  }

  render() {
    
    let pm = new PerfMetrics;
    let Divs = [];
    
    for(let i=0; i < 1000; ++i) {
      Divs.push(getBox(i));
    }

    pm.report();
    
    return <div> { Divs }</div>
  }
}
