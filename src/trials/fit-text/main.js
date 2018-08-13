/* A trial on auto sizing texts to fit their containers. */

import React, { Component } from 'react';
import { getRandomInt, getRandomText } from '../../libs/utils';
import './main.css';

export default class FitText extends Component {

  componentDidMount() {

    // document.querySelectorAll('.box').forEach(elm => console.log(elm.offsetWidth / elm.innerText.length, elm.offsetHeight));
  }

  render() {
    
    let Divs = [];

    for(let i=0; i < getRandomInt(3, 15); ++i) {
      Divs.push(<div key={i} className='box'
        style={{
          width: getRandomInt(5, 10) + 'em',
          height: getRandomInt(1, 10) + 'em',
        }}
      >
        { getRandomText(getRandomInt(6, 40)) }
      </div>
      );
    }
    
    return <div> { Divs }</div>
  }
}
