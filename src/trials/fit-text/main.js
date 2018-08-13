/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

/* Data */
const maxFontSize = 20;
const charWidth = 12; // In pixels, when the font-size is 20px.
const charHeight = 23;
const whRatio = charHeight / charWidth;

/* Helpers */
const getFontSize = (text, width, height) => {
  
  let words = text.split(' ');
  let maxRows = words.length;
  let minCol = words.reduce((a, b) => a.length > b.length ? a : b).length;

  console.log(minCol, maxRows, text, width, height, whRatio);
  return 20;
}

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => console.log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
  }

  render() {
    
    let Divs = [];
    
    for(let i=0; i < getRandomInt(3, 15); ++i) {
      let width = getRandomInt(5, 10) * 20;
      let height = getRandomInt(1, 10) * 20;
      let text = getRandomText(getRandomInt(6, 40));

      Divs.push(<div key={i} className='box'
        style={{
          // width: width + 'px',
          // height: height + 'px',
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
